let isEnrolled = false;
$(document).ready(function () {
    $('#name').text(localStorage.getItem('name'));
    const miniCourseId = window.location.pathname.split('/courses/')[1].split('/')[0];


    $.get("/api/minicourses/" + miniCourseId, function (miniCourse) {
        console.log(miniCourse);
        $('#miniCourseName').text(miniCourse.name);
        $('#miniCourseDescription').text(miniCourse.description);
        $('#teacherName').text(miniCourse.tutor.name);
        $('#subject').text(miniCourse.tags[0].subject.subjectName);
        $('#className').text(miniCourse.tags[0].subject.subjectName);
        $('#miniCourseDuration').text(miniCourse.duration);
        $('#difficulty').text(miniCourse.level);
        $('#medium').text(miniCourse.medium);
        $('#relevance').text(miniCourse.tags[0].category.categoryName);

        if (miniCourse.tutor.image != null) {
            $('#teacherImage').attr('src', miniCourse.tutor.img);
        }
        $('#nameOfTheTeacher').text(miniCourse.tutor.name);
        $('#teacherDescription').text(miniCourse.tutor.description);


        $.get('/api/minicourses/' + miniCourseId + '/isEnrolled', function (enrollment) {
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
                    $.post("/api/minicourses/" + miniCourseId + "/enroll", function (data) {
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
                            $('#msg').attr('class', 'text-danger').text("Enroll Again");
                        }
                    })
                })
            } else if (enrollment.success === 'false') {
                $('#msg').attr('class', 'text-danger').text("Enroll Again");
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
