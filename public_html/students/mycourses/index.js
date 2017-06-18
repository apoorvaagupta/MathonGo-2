/**
 * Created by apoorvaa_gupta on 2/6/17.
 */

$('document').ready(function () {
    $('#name').text(localStorage.getItem('name'));
    const studentId = window.location.pathname.split('/student/')[1].split('/')[0];
    $.get("/api/students/mycourses", function (enrollments) {
        console.log(enrollments);
        const ul = $('#minicourses-list');
        for(let i=0;i<enrollments.length;i++){
            ul.append('<li> <div class="minicourses-list-li"> <div class="row minicourse-div"> <div class="col-sm-4" style="padding: 0"><img src="./../../images/cover.jpg" class="minicourse-img"></div>' +
                '<div class="col-sm-8 minicourse-content">' +
                '<div class="row minicourse-chps"><span>' + enrollments[i].minicourse.tags[0].subject.subjectName + '</span>&nbsp;&nbsp; >&nbsp;&nbsp;<span>' + enrollments[i].minicourse.tags[0].course.courseName + '</span></div>' +
                '<div class="row minicourse-title"><span>' + enrollments[i].minicourse.name + '</span></div>' +
                '<div class="row"><p class="minicourse-description">' + enrollments[i].minicourse.description + '</p></div>' +
                '<div class="row align-items-center"><a href="/courses/' + enrollments[i].minicourse.id + '" class="enrol-style">VIEW</a></div>' +
                '</div> </div> <div class="row minicourse-tags"> <div class="minicourse-tag">' +
                '<div class="row tag-title">TEACHER </div> <div class="row tag-content"><span>' + enrollments[i].minicourse.tutor.name + '</span></div> </div>' +
                '<div class="minicourse-tag"> <div class="row tag-title">DURATION</div>' +
                '<div class="row tag-content"><span>' + enrollments[i].minicourse.duration + '</span></div> </div> <div class="minicourse-tag">' +
                '<div class="row tag-title">DIFFICULTY</div> <div class="row tag-content"><span>' + enrollments[i].minicourse.level + '</span></div>' +
                '</div> <div class="minicourse-tag"> <div class="row tag-title">RELEVANCE</div>' +
                '<div class="row tag-content"><span>' + enrollments[i].minicourse.tags[0].category.categoryName + '</span></div> </div> <div class="minicourse-tag">' +
                '<div class="row tag-title">MEDIUM</div>' +
                '<div class="row tag-content"><span>' + enrollments[i].minicourse.medium + '</span></div> </div> </div> </div> </li>'
            )
        }
    });


});