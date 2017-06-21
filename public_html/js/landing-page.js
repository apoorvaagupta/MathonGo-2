$(document).ready(function () {
    console.log("reached");
    // TODO: Delete token from db after 30days
    $('#loginForm').submit(function (e) {
        e.preventDefault();
    });
    $('#registerForm').submit(function (e) {
        e.preventDefault();
    });

    $('#registerButton').click(function () {
        let userName = $('#registerName').val();
        let userEmail = $('#registerEmail').val();
        let userPassword = $('#registerPassword').val();
        let userContact = $('#registerContact').val();
        let userClass = $('input[name="class"]:checked').val();
        if (userName.length === 0 || userEmail.length === 0 || userPassword.length === 0 || userContact.length !== 10 || userClass == null) {
            $('#errorRegister').text("Please Enter Valid Details");
            return;
        }

        $.post("/signup/student", {
            name: userName,
            email: userEmail,
            password: userPassword,
            contact: userContact,
            class: userClass
        }, function (student) {
            console.log(student);
            if (student.success === 'true') {
                //console.log("yo");
                $.post("/authorize", {
                    email: userEmail,
                    password: userPassword
                }, function (authToken) {
                    console.log(authToken);
                    if (authToken.success === 'true') {
                        window.localStorage.name = authToken;

                        window.localStorage.token = authToken.token;
                        window.location.replace(authToken.url);

                    }
                }).fail(function (err) {
                    $('#error').text("Wrong Credentials");
                    console.log("fail");
                    console.log(err);
                });
            }
        });
    });

    $('#loginButton').click(function () {

        $.post("/authorize/student", {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        }, function (authToken) {
            if (authToken.success === 'true') {
                window.localStorage.token = authToken.token;
                window.location.replace(authToken.url)
            }
        }).fail(function (err) {
            $('#error').text("Wrong Credentials");
            console.log("fail");
            console.log(err);
        });
    })
});