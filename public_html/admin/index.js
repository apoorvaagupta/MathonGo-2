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
            if (data.success === 'true') {
                $.post("/authorize", {
                    email: email,
                    password: password
                }, function (admindata) {
                    if (admindata.success === 'true') {
                        window.localStorage.token = admindata.token;
                        window.location.replace('/admin/dashboard')
                    }else{
                        window.alert("Please Try Again");
                    }
                })
            } else if(data.success === 'false' || data.success === 'error'){
                window.alert("Please Try Again");
            } else if(data === "only admin"){
                window.alert("Only Admins Are Allowed To SignUp");
            }
        })
    })
});

