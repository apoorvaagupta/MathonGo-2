$(document).ready(function () {
    $msg = $('#msg');
    $form = $('#dataForm');
    $form.submit(function (e) {
        e.preventDefault();
    });

    $('#classButton').click(function () {
        $form.text("");
        $msg.text("");
        $form.append(`
            <label>
            Class name : <input type="text" id="className">
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
        $submit = $('#submit');
        $submit.unbind('click');
        $submit.click(function () {
            $.post("/api/extra/addClass", {
                className: $('#className').val()
            }, function (data) {
                if (data.isSuccess === 'true') {
                    $msg.attr('class', 'text-success').text('Class Added');
                } else {
                    $msg.attr('class', 'text-danger').text(data.message);
                }
            }).fail(function () {
                console.log("haw");
            })
        })
    });

    $('#subjectButton').click(function () {
        $form.text("");
        $msg.text("");
        $form.append(`
            <label>
            Subject name : <input type="text" id="subjectName">
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
        $submit = $('#submit');
        $submit.unbind('click');
        $submit.click(function () {
            $.post("/api/extra/addSubject", {
                subjectName: $('#subjectName').val()
            }, function (data) {
                console.log(1);
                if (data.isSuccess === 'true') {
                    $msg.attr('class', 'text-success').text('Subject Added');
                } else {
                    $msg.attr('class', 'text-danger').text(data.message);
                }
            })
        })
    });

    $('#courseButton').click(function () {
        $form.text("");
        $msg.text("");
        $form.append(`
            <label>
            Course name : <input type="text" id="courseName">
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
        $submit = $('#submit');
        $submit.unbind('click');
        $submit.click(function () {
            $.post("/api/extra/addCourse", {
                courseName: $('#courseName').val()
            }, function (data) {
                if (data.isSuccess === 'true') {
                    $msg.attr('class', 'text-success').text('Course Added');
                } else {
                    $msg.attr('class', 'text-danger').text(data.message);
                }
            })
        })
    });

    $('#categoryButton').click(function () {
        $form.text("");
        $msg.text("");
        $form.append(`
            <label>
            Category name : <input type="text" id="categoryName">
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
        $submit = $('#submit');
        $submit.unbind('click');
        $submit.click(function () {
            $.post("/api/extra/addCategory", {
                categoryName: $('#categoryName').val()
            }, function (data) {
                if (data.isSuccess === 'true') {
                    $msg.attr('class', 'text-success').text('Course Added');
                } else {
                    $msg.attr('class', 'text-danger').text(data.message);
                }
            })
        })
    });

    $('#minicourseButton').click(function () {
        $form.text("");
        $msg.text("");
        $.get("/api/extra/filters", function (filters) {
            if (filters.isSuccess === 'true') {
                $form.append(`
                    <label>
                    Name of the minicourse: <input type="text" id="minicourse-name">
                    </label>
                    <br><br>
                    <label>
                    No. of lessons: <input type="text" id="minicourse-no-of-lessons">
                    </label>
                    <br><br>
                    <label>
                    Description: <br><textarea cols="60" id="minicourse-description"></textarea>
                    </label>
                    <br><br>
                    <label>
                    Duration of the minicourse: <input type="text" id="minicourse-duration">
                    </label>
                    <br><br>
                    <label>
                    Level:
                    <label><input type="radio" name="level" value="Beginner"> Beginner</label>
                    <label><input type="radio" name="level" value="Intermediate"> Intermediate</label>
                    <label><input type="radio" name="level" value="Advance"> Advance</label>
                    </label>
                    <br><br>
                    <label>
                    Medium:
                    <label><input type="radio" name="medium" value="English"> English</label>
                    <label><input type="radio" name="medium" value="Hindi"> Hindi</label>
                    </label><br><br>
                   `);
                let classString = "<label>Class : ";
                for (let i = 0; i < filters.classObject.length; i++) {
                    classString += `<label><input type="radio" name="class" value="` + filters.classObject[i].className + `"> ` + filters.classObject[i].className + ` </label> `
                }

                classString += `</label><br><br>`;

                let subjectString = "<label>Subject : ";
                for (let i = 0; i < filters.subjectObject.length; i++) {
                    subjectString += `<label><input type="radio" name="subject" value="` + filters.subjectObject[i].subjectName + `"> ` + filters.subjectObject[i].subjectName + ` </label> `
                }

                subjectString += `</label><br><br>`;

                let courseString = "<label>Course : ";
                for (let i = 0; i < filters.courseObject.length; i++) {
                    courseString += `<label><input type="radio" name="course" value="` + filters.courseObject[i].courseName + `"> ` + filters.courseObject[i].courseName + ` </label> `
                }

                courseString += `</label><br><br>`;

                let categoryString = "<label>Category : ";
                for (let i = 0; i < filters.categoryObject.length; i++) {
                    categoryString += `<label><input type="radio" name="category" value="` + filters.categoryObject[i].categoryName + `"> ` + filters.categoryObject[i].categoryName + ` </label> `
                }

                categoryString += `</label><br><br>`;

                $form.append(classString + subjectString + courseString + categoryString);
                $form.append(`<ol id="lessons-list"></ol>
                            <button class="btn buttons" id="add-lesson">Add Lesson</button>
                            `);
                $form.append(`<button class="btn buttons" id="submit">Submit</button>`);
                $submit = $('#submit');
                $submit.unbind('click');
                let counter = 0;
                $('#add-lesson').click(function () {
                    $('#lessons-list').append(`<li>
            <label>
        Name of the Lesson: <input type="text" id="lesson-` + counter + `-name">
    </label>
    <br><br>
    <label>
        Video URL: <input type="text" id="lesson-` + counter + `-videourl">
    </label>
    <br><br>
    <label>
        Description: <input type="text" id="lesson-` + counter + `-description">
    </label>
    <br><br>
    <label>
        Duration of the minicourse: <input type="text" id="lesson-` + counter + `-duration">
    </label>
    <br><br>
    <label>
        Level:
        <label><input type="radio" name="lessonlevel` + counter + `" value="Beginner"> Beginner</label>
        <label><input type="radio" name="lessonlevel` + counter + `" value="Intermediate"> Intermediate</label>
        <label><input type="radio" name="lessonlevel` + counter + `" value="Advance"> Advance</label>
    </label>
    <br><br>
    
        </li>`);


                    counter++;
                });

                console.log(1);

                $submit.click(function () {
                    console.log(2);
                    miniCourseData = {
                        name: $('#minicourse-name').val(),
                        noOfLessons: $('#minicourse-no-of-lessons').val(),
                        description: $('#minicourse-description').val(),
                        level: $('input[name="level"]:checked').val(),
                        duration: $('#minicourse-duration').val(),
                        medium: $('input[name="medium"]:checked').val(),
                        className: $('input[name="class"]:checked').val(),
                        subjectName: $('input[name="subject"]:checked').val(),
                        categoryName: $('input[name="category"]:checked').val(),
                        courseName: $('input[name="course"]:checked').val()

                    };
                    $.post('/api/tutors/1/addMiniCourse', miniCourseData, function (miniCourseFinal) {
                        let lessonData = [];
                        console.log(miniCourseFinal);
                        for (let i = 0; i < counter; i++) {
                            lessonData.push({
                                name: $('#lesson-' + i + '-name').val(),
                                videoUrl: $('#lesson-' + i + '-videourl').val(),
                                level: $('input[name="lessonlevel"]:checked').val(),
                                duration: $('#lesson-' + i + '-duration').val(),
                                description: $('#lesson-' + i + '-description').val(),
                                minicourseId: miniCourseFinal.id
                            })
                        }
                    })
                })
            }
        });
    })
});