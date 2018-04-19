function postClicked() {
    var name = $('#name').val();
    var password = $('#password').val();
    $.post('/create/session', { name: name, password: password });
}

$(document).ready(function() {
    $('form').submit(function(event) {
        postClicked();
    });
});