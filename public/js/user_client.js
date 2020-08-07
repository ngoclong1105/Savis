$(document).ready( function () {
    function init_alert() {
        hidden_alert('#add_email_vadilator');
        hidden_alert('#add_pass_validator');
    }
    function hidden_alert(element) {
        $(element).css('display', 'none');
    }

    function display_alert(element, msg) {
        $(element).css('display', 'block');
        $(element + ' span').text(msg);
    }

    init_alert();
    $('#email').change(function() {
        if (!validator.isEmail($(this).val().trim())) {
            display_alert('#add_email_vadilator', 'Invalid email');
        } else {
            hidden_alert('#add_email_vadilator');
        }
    });

    $('#password').change(function() {
        if (!validator.isLength($(this).val().trim(), {min: 6})) {
            display_alert('#add_pass_validator', 'Minimum of lenght 6 character!!');
        } else {
            hidden_alert('#add_pass_validator');
        }
    });

});


function reload_page() {
    setTimeout(() => {
        location.reload();
    }, 2000);
}




async function get_role_list(select_id) {
    var result = await requestPromiseGET('/roles');
    if (result.status == 200) {
        $("#" + select_id).empty();
        result.data.forEach(function(role) {
            $("#" + select_id).append(new Option(role['name'], role['code']));
        });
    }
}


function clickModalAddUser() {
    get_role_list('select_role');
}

async function addUser() {
    var firstName = getValueByIdSelector('firstName');
    var lastName = getValueByIdSelector('lastName');
    var userName = getValueByIdSelector('userName');
    var company = getValueByIdSelector('company');
    var address = getValueByIdSelector('address');
    var email = getValueByIdSelector('email');
    var password = getValueByIdSelector('password');
    var role = getValueByIdSelector('select_role');
    var status = getValueByIdSelector('select_status');

    var data = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        address: address,
        company: company,
        email: email,
        password: password,
        role: role,
        status: status
    };
    var result = await requestPromisePOST('/users', data);
    if (result.status == 200) {
        $.notify("Add user success!!", "success");
        reload_page();
    } else {
        $.notify(result.message, "error");
    }
}

async function clickModalEditUser(id) {
    get_role_list('edit_select_role');
    var result = await requestPromiseGET('/users/' + id);
    if (result.status == 200) {
        $('#edit_user').modal('toggle');
        var user = result.data;
        $('#edit_user_id').val(user['_id']);
        $('#edit_firstName').val(user['firstName']);
        $('#edit_lastName').val(user['lastName']);
        $('#edit_userName').val(user['userName']);
        $('#edit_company').val(user['company']);
        $('#edit_address').val(user['address']);
        $('#edit_email').val(user['email']);
        $('#edit_select_role').val(user['role']);
        if(user['status']) {
            $('#edit_select_status').val('true');
        } else {
            $('#edit_select_status').val('false');
        }
    } else {
        $.notify(result.message, "error");
    }
}

async function editUser() {
    var user_id = getValueByIdSelector('edit_user_id');
    var firstName = getValueByIdSelector('edit_firstName');
    var lastName = getValueByIdSelector('edit_lastName');
    var company = getValueByIdSelector('edit_company');
    var address = getValueByIdSelector('edit_address');
    var role = getValueByIdSelector('edit_select_role');
    var status = getValueByIdSelector('edit_select_status');
    var data = {
        firstName: firstName,
        lastName: lastName,
        company: company,
        address: address,
        role: role,
        status: status == 'true' ? true: false
    };
    var result = await requestPromisePUT('/users/' + user_id, data);
    if (result.status == 200) {
        $.notify("Update user success!!", "success");
        setTimeout(() => {
            location.reload();
        }, 2000);
    } else {
        $.notify(result.message, "error");
    }
}


function clickModalDeleteUser(id) {
    $('#user_id').val(id);
}

async function deleteUser() {
    var user_id = getValueByIdSelector('user_id');
    var result = await requestPromiseDELETE('/users/' + user_id);
    if (result.status == 200) {
        $.notify("Delete user success!!", "success");
        setTimeout(() => {
            location.reload();
        }, 1500);
    } else {
        $.notify(result.msg, "error");
    }
}
