$(document).ready(function () {

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

        $.post("http://localhost:4000/signup", {
            name: userName,
            email: userEmail,
            password: userPassword,
            contact: userContact,
            class: userClass
        }, function (student) {
            // if (student.isSuccess === "true") {
            //     let url = student.url;
            //     console.log(url);
            //     console.log(student);
            //     localStorage.setItem("studentId", student.row.id);
            //     localStorage.setItem("studentName", student.row.name);
            //     //console.log(localStorage.getItem("studentId"));
            //     window.location.replace(url);
            // } if(student.isSuccess==="Email Already Exists") {
            //     $('#errorRegister').text("Email Already Exists");
            // }
        });
    });

    $('#loginButton').click(function () {
        console.log($('#loginEmail').val(),$('#loginPassword').val());
        $.post("http://localhost:4000/login", {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        }, function (student) {
            if (student.isSuccess === "true") {
                let url = student.url;
                console.log(url);
                console.log(student);
                localStorage.setItem("studentId", student.row.id);
                localStorage.setItem("studentName", student.row.name);
                //console.log(localStorage.getItem("studentId"));
                window.location.replace(url);
            } else {
                $('#errorLogin').text("Wrong Credentials");
            }
        });
    })
});