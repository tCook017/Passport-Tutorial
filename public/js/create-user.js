function success(data) {
    console.log(data.name);
}

function postClicked() {
    var name = $('#name').val();
    var password = $('#password').val();
    var permissions = {
        userType: $('#permissions').val()
    }
    $.post('/create/user', { name: name, password: password, permissions: permissions }, success);
    return(false);
}

$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();
        postClicked();
    });
});