/**
 * Created by apoorvaa_gupta on 2/6/17.
 */

$('document').ready(function () {
    const studentId = window.location.pathname.split('/student/')[1].split('/')[0];
    $.get("http://localhost:4000/api/students/"+studentId+"/bookmarks", function (lessons) {
        const lectures = $('#lectures');
        for (let i = 0; i < miniCourse.lessons.length; i++) {
            lectures.append(`<div class="col-sm-12" style="cursor: pointer;height: auto;padding: 20px;border-bottom: solid 2px #EEEEEE;" onclick="window.location='http://localhost:4000/lesson/`+ lessons[i].id +`'">
                        <div class="row" style="margin-bottom: 0">
                            <div class="col-sm-1" style="padding-left: 0">
                                <img src="/images/icons/movie.png">
                            </div>
                            <div class="col-sm-10">
                                <h5 style=";margin-bottom: 7px; color: #444; font-weight: 500">` + (i + 1) + `. ` + lessons[i].name + `<br></h5>
                                <p style="font-size: 14px;font-weight: 400;margin-bottom: 0px;color: #A4A5A9">
                                    <img src="/images/icons/timer.png">&nbsp;<span
                                        style="margin-top: 5px; font-weight: 500">` + lessons[i].duration + `</span>&nbsp;&nbsp;
                                    <img src="/images/icons/eye.png">&nbsp;<span id="lessonViews"
                                                                                 style="margin-top: 5px; font-weight: 500"></span>
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