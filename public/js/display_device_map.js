var DeviceIcon = L.Icon.extend({
    options: {
        iconSize:     [36, 36],
    }
});

var offlineIcon = new DeviceIcon({iconUrl: 'images/status_device/off.png'}),
    onlineIcon = new DeviceIcon({iconUrl: 'images/status_device/on.png'}),
    warningIcon = new DeviceIcon({iconUrl: 'images/status_device/warning.png'}),
    stopIcon = new DeviceIcon({iconUrl: 'images//status_device/stop.png'});

var popupOnlineOption = {
    className: "map-popup-online",
};
var popupOfflineOption = {
    className: "map-popup-offline",
};

var popupStopOption = {
    className: "map-popup-stop",
};


var mapObj = null;
var markers = [];
var defaultCoord = [16.0256251, 108.1992159]; // coord mặc định, 9 giữa HCMC
var zoomLevel = 6;
var mapConfig = {
    attributionControl: false, // để ko hiện watermark nữa, nếu bị liên hệ đòi thì nhớ open nha
    center: defaultCoord, // vị trí map mặc định hiện tại
    zoom: zoomLevel, // level zoom
};

var dataDevice;
var status = 99;

$(document).ready(function() {
    // init map
    mapObj = L.map('plcMap', mapConfig);
    
    // add tile để map có thể hoạt động, xài free từ OSM
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapObj);
    // init
    get_list_device_map();

    setInterval(function(){
        get_list_device_map();
    }, 3000);


    $('#select_device_map').on('change', function() {
        dataDevice = [];
        status = this.value;
        console.log(this.value);
        get_list_device_map();
    });
});


function addMarker(coord, popupContent, popupOptionObj, markerObj, device_id) {
    if (!popupOptionObj) {
        popupOptionObj = {};
    }
    if (!markerObj) {
        markerObj = {};
    }
    
    var marker = L.marker(coord, markerObj).addTo(mapObj); // chơi liều @@
    var popup = L.popup(popupOptionObj);
    popup.setContent(popupContent);
    
    // binding
    marker.bindPopup(popup);
    // marker.bindTooltip("my tooltip text");
    markers.push({
        device_id: device_id,
        marker: marker
    });
    return marker;
}


function get_list_device_map() {
    $.ajax({
        url: $("#base-url").val()+"device/get_devices/" + status,
        traditional: true,
        type: "get",
        dataType: "text",
        success: function (result) {
            var resultData = $.parseJSON(result);
            if (JSON.stringify(resultData) != JSON.stringify(dataDevice)) {
                markers.forEach(function (item) {
                    item.marker.remove();
                });
                markers = [];
                console.log(markers);
                generate_devices(resultData);
                generate_device_info(resultData);
                dataDevice = resultData;
            }
        }
    });
}



function generate_device_info(resultData) {
    html_display = '';
    resultData.forEach(function(device) {
        var time_diff = device['time_update'] ? device['time_update'] : device['created_at'];
        var old_date = new Date(time_diff);
        var kinh_do = parseFloat(device['kinh_do']).toFixed(8);
        var vi_do = parseFloat(device['vi_do']).toFixed(8);
        var display_x_y = [vi_do, kinh_do];
        if(status == 99) {
            if (diff_minute(old_date) > 5) {
                html_display += generate_list_device_map(device, 'btn-secondary', display_x_y); 
            } else {
                if (device['value'] == 2) {
                    html_display += generate_list_device_map(device, 'btn-warning', display_x_y); 
                } else if (device['status'] == 0) {
                    html_display += generate_list_device_map(device, 'btn-danger', display_x_y); 
                } else {
                    html_display += generate_list_device_map(device, 'btn-success', display_x_y); 
                }
            }
        } else if (status == 0) {
            if ((device['status'] == 1) && (diff_minute(old_date) > 5)) {
                html_display += generate_list_device_map(device, 'btn-secondary', display_x_y); 
            }
        } else if(status == 1) {
            if ((device['status'] == 1) && (diff_minute(old_date) <= 5) && (device['value'] != 2)) {
                html_display += generate_list_device_map(device, 'btn-success', display_x_y); 
            }
        } else if (status == 2) {
            if ((device['value'] == 2)  && (diff_minute(old_date) <= 5)) {
                html_display += generate_list_device_map(device, 'btn-warning', display_x_y); 
            }
        }
   });
   $('#listInfoDeviceMap').html(html_display);
}

function generate_list_device_map(device, class_status, display_x_y) {
    return `
        <button id="${device['device_id']}" type="button" class="btn ${class_status} btn-map-device" onclick="list_sub_device_map('${device['device_id']}', ${display_x_y})">
        <span class="display_label_device">${device['device_id']} - ${device['name']}</span>
        </button>
    `;
}

function list_sub_device_map(device_id, vi_do, kinh_do) {
    mapObj.flyTo(new L.LatLng(vi_do, kinh_do), 14);
    markers.forEach(function (item) {
        if(item.device_id === device_id) {
            console.log(item);
            item.marker.openPopup();
        }
    });
}

function generate_devices(resultData) {
   resultData.forEach(function(device) {
        var time_diff = device['time_update'] ? device['time_update'] : device['created_at'];
        var old_date = new Date(time_diff);
        var kinh_do = parseFloat(device['kinh_do']).toFixed(8);
        var vi_do = parseFloat(device['vi_do']).toFixed(8);
        var display_x_y = [vi_do, kinh_do];
        var html_display = `
            <div class="box_display_map">
                <div class="id_device_map_display">${device['device_id']}</div>
                <div class="name_device_map_display">${device['name']}</div>
                <div class="box_parameter_map">
                    <div class="box_parameter_display">
                        <p class="title_parameter_display">Inputs</p>
                        <p class="parameter_display" style="color: blue;">${device['inputs']}</p>
                    </div>
                    <div class="box_parameter_display">
                        <p class="title_parameter_display">Outputs</p>
                        <p class="parameter_display" style="color: chocolate;">${device['outputs']}</p>
                    </div>
                    <div class="box_parameter_display">
                        <p class="title_parameter_display">Analogs</p>
                        <p class="parameter_display" style="color: yellowgreen;">${device['analogs']}</p>
                    </div>
                </div> 
                <p class="time_latest_update">Lastest Updated: <span style="color: blueviolet;">${device['time_update'] ? device['time_update'] : device['created_at']}</span></p>
            </div>  
            <div class='clearfix'>
            </div>
        `;
        var title = device['device_id'] + ' - '  + device['name'] + ' (click for detail)';
        if(status == 99) {
            if (diff_minute(old_date) > 5) {
                addMarker(display_x_y, html_display, popupOfflineOption, {icon: offlineIcon, title: title}, device['device_id']);
            } else {
                if (device['value'] == 2) {
                    addMarker(display_x_y, html_display, popupStopOption, {icon: warningIcon, title: title}, device['device_id']);
                } else if (device['status'] == 0) {
                    addMarker(display_x_y, html_display, popupStopOption, {icon: stopIcon, title: title}, device['device_id']);
                } else {
                    addMarker(display_x_y, html_display, popupOnlineOption, {icon: onlineIcon, title: title}, device['device_id']);
                }
            }
        } else if (status == 0) {
            if ((device['status'] == 1) && (diff_minute(old_date) > 5)) {
                addMarker(display_x_y, html_display, popupOfflineOption, {icon: offlineIcon, title: title}, device['device_id']);
            }
        } else if (status == 1) {
            if ((device['status'] == 1) && (diff_minute(old_date) <= 5) && (device['value'] != 2)) {
                addMarker(display_x_y, html_display, popupOnlineOption, {icon: onlineIcon, title: title}, device['device_id']);
            }
        } else if (status == 2) {
            if ((device['value'] == 2)  && (diff_minute(old_date) <= 5)) {
                addMarker(display_x_y, html_display, popupStopOption, {icon: warningIcon, title: title}, device['device_id']);
            }
        }
        
   });
}


function diff_minute(old_date) {
   var today = new Date();
   var diff =(today.getTime() - old_date.getTime()) / 1000;
   diff /= 60;
   return Math.abs(Math.round(diff));
}