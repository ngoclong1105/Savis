
$(document).ready(function() {
    $('#role_table').DataTable();
    $('#user_table').DataTable();
});


function requestPromiseGET(url, data = {}) {
    return new Promise(resolve => {
        $.ajax({
            url: 'api/v1' + url,
            traditional: true,
            type: "get",
            dataType: "json",
            contentType: 'application/json',
            data: data,
            success: function (result) {
                resolve(result);
            }
        });
    });
}

function requestPromisePOST(url, data = {}) {
    return new Promise(resolve => {
        $.ajax({
            url: 'api/v1' + url,
            traditional: true,
            type: "post",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                resolve(result);
            }
        });
    });
}

function requestPromisePUT(url, data = {}) {
    return new Promise(resolve => {
        $.ajax({
            url: 'api/v1' + url,
            traditional: true,
            type: "put",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                resolve(result);
            }
        });
    });
}

function requestPromiseDELETE(url, data = {}) {
    return new Promise(resolve => {
        $.ajax({
            url: 'api/v1' + url,
            traditional: true,
            type: "delete",
            dataType: "json",
            contentType: 'application/json',
            data: data,
            success: function (result) {
                resolve(result);
            }
        });
    });
}

function getValueByIdSelector(id_selector) {
    return $('#' + id_selector ).val().trim();
}
