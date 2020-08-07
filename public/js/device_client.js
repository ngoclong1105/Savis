async function addDevice() {
    var device = {
        deviceId: getValueByIdSelector('add_device_id'),
        name: getValueByIdSelector('add_name_device'),
        firmVer: getValueByIdSelector('add_firm_version_device'),
        mdSim: getValueByIdSelector('add_module_sim_device'),
        sdt: [],
        type: 1,
        inputs: getValueByIdSelector('add_inputs_device'),
        outputs: getValueByIdSelector('add_outputs_device'),
        analogs: getValueByIdSelector('add_analogs_device'),
        status: true
    };
    
    var result = await requestPromisePOST('/devices', device);
    if (result.status == 200) {
        $.notify("Add device success!!", "success");
        setTimeout(() => {
            location.replace(location.origin + '/device_list');
        }, 2000);
    } else {
        $.notify(result.message, "error");
    }
}

async function editRole() {
    var role = {
        role_id: '',
        name: '',
        code: '',
        permissions: {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: []
        },
        status: true
    };
    role.role_id = getValueByIdSelector('role_id');
    role.name = getValueByIdSelector('edit_name_role');
    role.code = getValueByIdSelector('edit_code_role');
    var total_permission = getValueByIdSelector('edit_total_permission');
    for (var index_permission = 0; index_permission < total_permission; index_permission++ ) {
        for (var item_index = 0; item_index < 15; item_index++) {
            if ($('#edit_permission_check_get_' + index_permission + '_' + item_index).is(':checked')) {
                var value = getValueByIdSelector('edit_permission_check_get_' + index_permission + '_' + item_index);
                role.permissions.GET.push(value);
            }
            if ($('#edit_permission_check_post_' + index_permission + '_' + item_index).is(':checked')) {
                var value = getValueByIdSelector('edit_permission_check_post_' + index_permission + '_' + item_index);
                role.permissions.POST.push(value);
            }
            if ($('#edit_permission_check_put_' + index_permission + '_' + item_index).is(':checked')) {
                var value = getValueByIdSelector('edit_permission_check_put_' + index_permission + '_' + item_index);
                role.permissions.PUT.push(value);
            }
            if ($('#edit_permission_check_delete_' + index_permission + '_' + item_index).is(':checked')) {
                var value = getValueByIdSelector('edit_permission_check_delete_' + index_permission + '_' + item_index);
                role.permissions.DELETE.push(value);
            }
        }
    }
    var result = await requestPromisePUT('/roles/' + role.role_id, role);
    if (result.status == 200) {
        $.notify("Update role success!!", "success");
        setTimeout(() => {
            location.replace(location.origin + '/role_list');
        }, 2000);
    } else {
        $.notify(result.message, "error");
    }
}

function clickModalDeleteRole(id) {
    $('#role_id').val(id);
}

async function deleteRole() {
    var role_id = getValueByIdSelector('role_id');
    var result = await requestPromiseDELETE('/roles/' + role_id);
    if(result && result.status != 200) {
        $.notify("Delete role fail!!", "error");
    } else {
        $.notify("Delete role success!!", "success");
    }
    setTimeout(() => {
        location.reload();
    }, 2000);
}