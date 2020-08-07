function saveInfoUser() {
    var user_id = getValueByIdSelector('profile_user_id');
    var first_name = getValueByIdSelector('profile_first_name');
    var last_name = getValueByIdSelector('profile_last_name');
    
    $.ajax({
        url: 'api/update_user',
        traditional: true,
        type: "put",
        dataType: "text",
        data: {
            user_id: user_id,
            first_name: first_name,
            last_name: last_name
        },
        success: function (result) {
            var result = $.parseJSON(result);
            if (result.status == 200) {
                $.notify("Update user success!!", "success");
            } else {
                $.notify(result.msg, "error");
            }
        }
    });
}

function changePassword() {
    var user_id = getValueByIdSelector('profile_change_password_user_id');
    var current_password = getValueByIdSelector('profile_current_password');
    var new_password = getValueByIdSelector('profile_new_password');

    $.ajax({
        url: 'api/change_password_user',
        traditional: true,
        type: "put",
        dataType: "text",
        data: {
            user_id: user_id,
            current_password: current_password,
            new_password: new_password
        },
        success: function (result) {
            var result = $.parseJSON(result);
            if (result.status == 200) {
                $.notify("Update user success!!", "success");
                setTimeout(() => {
                    location.replace(location.origin + '/logout');
                }, 1000);
            } else {
                $.notify(result.msg, "error");
            }
        }
    });
}