/**
 * Created by apoorvaa_gupta on 13/6/17.
 */


$('document').ready(function () {

    $.get("http://localhost:4000/api/minicourses", function (minicourses) {
        console.log(minicourses);
        const ul = $('#minicourses-list');
        for (let i = 0; i < minicourses.length; i++) {
            ul.append('<li> <div class="minicourses-list-li"> <div class="row minicourse-div"> <div class="col-sm-4" style="padding: 0"><img src="./../images/cover.jpg" class="minicourse-img"></div>' +
                '<div class="col-sm-8 minicourse-content">' +
                '<div class="row minicourse-chps"><span>' + minicourses[i].tags[0].subject.subjectName + '</span>&nbsp;&nbsp; >&nbsp;&nbsp;<span>' + minicourses[i].tags[0].course.courseName + '</span></div>' +
                '<div class="row minicourse-title"><span>' + minicourses[i].name + '</span></div>' +
                '<div class="row"><p class="minicourse-description">' + minicourses[i].description + '</p></div>' +
                '<div class="row align-items-center"><a href="http://localhost:4000/courses/' + minicourses[i].id + '" class="enrol-style">VIEW</a></div>' +
                '</div> </div> <div class="row minicourse-tags"> <div class="minicourse-tag">' +
                '<div class="row tag-title">TEACHER </div> <div class="row tag-content"><span>' + minicourses[i].tutor.name + '</span></div> </div>' +
                '<div class="minicourse-tag"> <div class="row tag-title">DURATION</div>' +
                '<div class="row tag-content"><span>' + minicourses[i].duration + '</span></div> </div> <div class="minicourse-tag">' +
                '<div class="row tag-title">DIFFICULTY</div> <div class="row tag-content"><span>' + minicourses[i].level + '</span></div>' +
                '</div> <div class="minicourse-tag"> <div class="row tag-title">RELEVANCE</div>' +
                '<div class="row tag-content"><span>' + minicourses[i].tags[0].category.categoryName + '</span></div> </div> <div class="minicourse-tag">' +
                '<div class="row tag-title">MEDIUM</div>' +
                '<div class="row tag-content"><span>' + minicourses[i].medium + '</span></div> </div> </div> </div> </li>'
            )
        }
    });


});