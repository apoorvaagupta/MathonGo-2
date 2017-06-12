$(document).ready(function () {

    const miniCourseId = window.location.pathname.split('/library/')[1].split('/')[0];

    $.get("http://localhost:4000/api/minicourses/" + miniCourseId, function (miniCourse) {
        $('#miniCourseName').text(miniCourse.name);
        $('#miniCourseDescription').text(miniCourse.description);

        $('#teacherName').text(miniCourse.tutor.name);
        $('#ratings').text("");
        $('#noOfReviews').text("");
        $('#miniCourseDuration').text(miniCourse.duration);
        $('#difficulty').text(miniCourse.level);
        $('#medium').text(miniCourse.medium);
        $('#relevance').text(miniCourse.tags);

        if (miniCourse.tutor.image != null) {
            $('#teacherImage').attr('src', miniCourse.tutor.img);
        }
        $('#nameOfTheTeacher').text(miniCourse.tutor.name);
        $('#teacherDescription').text(miniCourse.tutor.description);

        const lectures = $('#lectures');
        for (let i = 0; i < miniCourse.lessons.length; i++) {
            lectures.append(`<div class="col-sm-12" style="cursor: pointer;height: auto;padding: 20px;border-bottom: solid 2px #EEEEEE;" onclick="window.location='http://localhost:4000/lessons/`+ miniCourse.lessons[i].id +`'">
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

    })

});

