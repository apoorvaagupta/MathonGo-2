/**
 * Created by apoorvaa_gupta on 2/6/17.
 */
$(document).ready(function () {
    $('#name').text(localStorage.getItem('name'));

    const lessonId = window.location.pathname.split('/lessons/')[1].split('/')[0];

    $.get("http://localhost:4000/api/lessons/" + lessonId, function (lesson) {
        $.get("http://localhost:4000/api/minicourses/" + lesson.minicourseId, function (miniCourse) {
            $('#miniCourseName').text(miniCourse.name);
            $('#noOfLessons').text(miniCourse.noOfLessons + ' Lectures');
            $('#miniCourseDuration').text(miniCourse.duration);

            $('#nameOfTheMiniCourse').text(lesson.name);
            $('#durationOfMiniCourse').text(lesson.duration);
            $('#lessonViews').text();
            $('#lessonDescription').text(lesson.description);

            if (miniCourse.tutor.image != null) {
                $('#teacherImage').attr('src', miniCourse.tutor.img);
            }
            $('#nameOfTheTeacher').text(miniCourse.tutor.name);
            $('#teacherDescription').text(miniCourse.tutor.description);

            $('#bookmark').click(function () {
                $.
            });

            const lessons = $('#lessons');
            for (let i = 0; i < miniCourse.lessons.length; i++) {
                if (miniCourse.lessons[i].id !== lesson.id) {
                    lessons.append(`<div class="col-sm-12" style="cursor: pointer;height: auto;padding: 20px;border-bottom: solid 2px #EEEEEE;" onclick="window.location='http://localhost:4000/lessons/` + miniCourse.lessons[i].id + `'">
                    <h5 style="font-size: 18px;margin-bottom: 7px;font-weight: 500;color: #A4A5A9">` + (i + 1) + `. ` + miniCourse.lessons[i].name + `<br></h5>
                </div>`)
                } else {
                    lessons.append(`<div class="col-sm-12" style="height: auto;padding: 20px;border-bottom: solid 2px #EEEEEE;background-color: #DDDDDD">
                    <h5 style="font-size: 18px;margin-bottom: 7px;font-weight: 500;color: #A4A5A9">` + (i + 1) + `. ` + miniCourse.lessons[i].name + `<br></h5>
                </div>`)
                }
            }

        })
    })
});