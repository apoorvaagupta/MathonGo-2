$(document).ready(function () {

    const tempMiniCourse = window.location.search.split('?')[1];
    const miniCourseId = tempMiniCourse.split('miniCourseId=')[1];
    $.get("http://localhost:4000/api/minicourse"+miniCourseId,function (miniCourse) {
        
    })

});

