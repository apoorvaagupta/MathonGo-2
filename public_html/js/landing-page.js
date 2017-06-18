$(document).ready(function () {
    console.log("reached");

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

        $.post("http://localhost:4000/signup/student", {
            name: userName,
            email: userEmail,
            password: userPassword,
            contact: userContact,
            class: userClass
        }, function (student) {
            console.log(student);
            if (student.success === 'true') {
                console.log("yo");
                $.post("http://localhost:4000/login/student", {
                    email: userEmail,
                    password: userPassword
                }, function (data) {
                    if (data.success === 'true') {
                        console.log(data.name);
                        window.localStorage.name =  data.name;
                        window.location.replace(data.url)
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

        $.post("http://localhost:4000/login/student", {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        }, function (data) {
            if (data.success === 'true') {
                localStorage.setItem('name', data.name);
                window.location.replace(data.url)
            }
        }).fail(function (err) {
            $('#error').text("Wrong Credentials");
            console.log("fail");
            console.log(err);
        });
    })
});