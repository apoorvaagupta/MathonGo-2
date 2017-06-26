let isEnrolled = false;
$(document).ready(function () {

    $.ajax({
        url: '/checkLoggedIn',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).done(function (data) {

        if (data.success === 'true') {
            $('#name').text(localStorage.getItem('name'));
        } else {
            $('#userDetails').remove();
            $('#header-bar').append(`<div class=" col-sm-2 col-12 align-middle header-links-div"><a
                class="align-middle header-links" href="/">Register / Login</a></div>`)

        }
    }).fail(function (object) {
        if (object.responseText === 'Unauthorized') {
            $('#userDetails').remove();
            $('#header-bar').append(`<div class=" col-sm-2 col-12 align-middle header-links-div"><a
                class="align-middle header-links" href="/">Register / Login</a></div>`)
        }
    });






    const miniCourseId = window.location.pathname.split('/courses/')[1].split('/')[0];


    $.get("/api/minicourses/" + miniCourseId, function (miniCourse) {
        console.log(miniCourse);
        $('#miniCourseName').text(miniCourse.name);
        $('#miniCourseDescription').text(miniCourse.description);
        $('#teacherName').text(miniCourse.tutor.name);
        $('#subject').text(miniCourse.tag.subject.subjectName);
        $('#className').text(miniCourse.tag.class.className);
        $('#miniCourseDuration').text(miniCourse.duration);
        $('#difficulty').text(miniCourse.level);
        $('#medium').text(miniCourse.medium);
        $('#relevance').text(miniCourse.minicoursecategories.map((i) => i.category.categoryName).join(', '));

        if (miniCourse.tutor.image != null) {
            $('#teacherImage').attr('src', miniCourse.tutor.img);
        }
        $('#nameOfTheTeacher').text(miniCourse.tutor.name);
        $('#teacherDescription').text(miniCourse.tutor.description);


        $.ajax({
            url: '/api/minicourses/' + miniCourseId + '/isEnrolled',
            method: 'GET',
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
        }).done(function (enrollment) {
            console.log(enrollment);
            const enroll = $('#enroll');
            if (enrollment.isEnrolled === 'true') {
                console.log(1);
                enroll.text("Enrolled");
                isEnrolled = true;
                enroll.click(function () {
                    $('#msg').attr('class', 'text-success').text("Already Enrolled");
                });
            } else if (enrollment.isEnrolled === 'false') {
                enroll.click(function () {
                    $.ajax({
                        url: "/api/minicourses/" + miniCourseId + "/enroll",
                        method: 'POST',
                        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
                    }).done(function (data) {
                        console.log("enrol fn");
                        if (data.success === 'true') {
                            enroll.text("Enrolled");
                            enroll.unbind('click');
                            isEnrolled = true;
                            $('#msg').text("");
                            enroll.click(function () {
                                $('#msg').attr('class', 'text-success').text("Already Enrolled");
                            });
                        } else {

                            if(data.message === "Student Only")
                                $('#msg').attr('class', 'text-danger').text("Only Students Can Enroll");
                            else
                                $('#msg').attr('class', 'text-danger').text("Enroll Again");
                        }
                    }).fail(function (object) {
                        window.alert('Please Login First');
                        window.location.replace('/');
                    });
                })
            } else if (enrollment.success === 'false') {
                $('#msg').attr('class', 'text-danger').text("Enroll Again");
            }
        }).fail(function (object) {
            if (object.responseText === 'Unauthorized') {
                const enroll = $('#enroll');
                enroll.click(function () {
                    window.alert('Please Login First');
                    window.location.replace('/');
                });
            }
        });


        const lectures = $('#lectures');
        for (let i = 0; i < miniCourse.lessons.length; i++) {
            lectures.append(`<div class="col-sm-12" style="cursor: pointer;height: auto;padding: 20px;border-bottom: solid 2px #EEEEEE;" onclick="goToLesson(` + miniCourse.lessons[i].id + `)">
                        <div class="row" style="margin-bottom: 0px">
                            <div class="col-sm-1" style="padding-left: 0px">
                                <img src="/images/icons/movie.png">
                            </div>
                            <div class="col-sm-10">
                                <h5 style=";margin-bottom: 7px; color: #444; font-weight: 500">` + (i + 1) + `. ` + miniCourse.lessons[i].name + `<br></h5>
                                <p style="font-size: 14px;font-weight: 400;margin-bottom: 0px;color: #A4A5A9">
                                    <img src="/images/icons/timer.png">&nbsp;<span
                                        style="margin-top: 5px; font-weight: 500">` + miniCourse.lessons[i].duration + `</span>&nbsp;&nbsp;
                                    <img src="/images/icons/eye.png">&nbsp;<span style="margin-top: 5px; font-weight: 500"></span>
                                </p>
                            </div>
                            <div class="col-sm-1">
                                <img src="/images/icons/arrow-right-drop-circle-green.png">
                            </div>
                        </div>
                    </div>
            
            
            `)
        }

    });


});

function goToLesson(lessonId) {
    if (isEnrolled) {
        window.location = '/lessons/' + lessonId;
    } else {
        $('#msg').attr('class', 'text-danger').text("Please Enroll First");
    }
}
