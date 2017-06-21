$(document).ready(function () {
    $signup = $('#signup');
    $signup.unbind('click');
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let secret = $('#secret').val();
    $signup.click(function () {
        $.post("/signup/admin", {
            name = name,
            email = email,
            password = password,
            secret = secret
        }, function (data) {
            if (data.isSuccess === 'true') {
                $msg.attr('class', 'text-success').text('Category Added');
            } else {
                $msg.attr('class', 'text-danger').text(data.message);
            }
        })
    })
});

