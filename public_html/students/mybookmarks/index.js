
/**
 * Created by apoorvaa_gupta on 2/6/17.
 */

$('document').ready(function () {
    $('#name').text(localStorage.getItem('name'));
    const studentId = window.location.pathname.split('/student/')[1].split('/')[0];
    

    $.ajax({
        url: "/api/students/bookmarks",
        method: 'GET',
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    }).done(function (bookmarks) {
        const lectures = $('#lectures');
        for (let i = 0; i < bookmarks.length; i++) {
            lectures.append(`<div class="col-sm-12" style="cursor: pointer;height: auto;padding: 20px;border-bottom: solid 2px #EEEEEE;" onclick="window.location='/lessons/` + bookmarks[i].lesson.id + `'">
                        <div class="row" style="margin-bottom: 0">
                            <div class="col-sm-1" style="padding-left: 0">
                                <img src="/images/icons/movie.png">
                            </div>
                            <div class="col-sm-10">
                                <h5 style=";margin-bottom: 7px; color: #444; font-weight: 500">` + (i + 1) + `. ` + bookmarks[i].lesson.name + `<br></h5>
                                <p style="font-size: 14px;font-weight: 400;margin-bottom: 0px;color: #A4A5A9">
                                    <img src="/images/icons/timer.png">&nbsp;<span
                                        style="margin-top: 5px; font-weight: 500">` + bookmarks[i].lesson.duration + `</span>&nbsp;&nbsp;
                                                                    </p>
                            </div>
                            <div class="col-sm-1">
                                <img src="/images/icons/arrow-right-drop-circle-green.png">
                            </div>
                        </div>
                    </div>
            
            
            `)
        }

    }).fail(function (object) {
        if (object.responseText === 'Unauthorized') {
            window.alert("Please Login First");
            window.location.replace('/');
        }
    });


});
