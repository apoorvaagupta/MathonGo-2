$(document).ready(function () {
    $.ajax({
        url: '/checkAdmin',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).done(function (data) {
        console.log(1);
        console.log(data);
        if (data.success === 'true') {
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
            Class name : <input type="text" id="className" required>
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
                $submit = $('#submit');
                $submit.unbind('click');
                $submit.click(function () {


                    $.ajax({
                        url: "/api/extra/addClass",
                        data: {className: $('#className').val()},
                        method: 'POST',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).done(function (data) {
                        if (data.isSuccess === 'true') {
                            $msg.attr('class', 'text-success').text('Class Added');
                        } else {
                            $msg.attr('class', 'text-danger').text(data.message);
                        }
                    }).fail(function (object) {
                        if (object.responseText === 'Unauthorized') {
                            window.alert("Please Login First");
                            window.location.replace('/');
                        }
                    })
                })
            });

            $('#subjectButton').click(function () {
                $form.text("");
                $msg.text("");
                $form.append(`
            <label>
            Subject name : <input type="text" id="subjectName" required>
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
                $submit = $('#submit');
                $submit.unbind('click');
                $submit.click(function () {

                    $.ajax({
                        url: "/api/extra/addSubject",
                        data: {subjectName: $('#subjectName').val()},
                        method: 'POST',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).done(function (data) {
                        console.log(1);
                        if (data.isSuccess === 'true') {
                            $msg.attr('class', 'text-success').text('Subject Added');
                        } else {
                            $msg.attr('class', 'text-danger').text(data.message);
                        }
                    }).fail(function (object) {
                        if (object.responseText === 'Unauthorized') {
                            window.alert("Please Login First");
                            window.location.replace('/');
                        }
                    })
                })
            });

            $('#courseButton').click(function () {
                $form.text("");
                $msg.text("");
                $form.append(`
            <label>
            Course name : <input type="text" id="courseName"  required>
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
                $submit = $('#submit');
                $submit.unbind('click');
                $submit.click(function () {


                    $.ajax({
                        url: "/api/extra/addCourse",
                        data: {courseName: $('#courseName').val()},
                        method: 'POST',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).done(function (data) {
                        if (data.isSuccess === 'true') {
                            $msg.attr('class', 'text-success').text('Course Added');
                        } else {
                            $msg.attr('class', 'text-danger').text(data.message);
                        }
                    }).fail(function (object) {
                        if (object.responseText === 'Unauthorized') {
                            window.alert("Please Login First");
                            window.location.replace('/');
                        }
                    })
                })
            });

            $('#categoryButton').click(function () {
                $form.text("");
                $msg.text("");
                $form.append(`
            <label>
            Category name : <input type="text" id="categoryName"  required>
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
                $submit = $('#submit');
                $submit.unbind('click');
                $submit.click(function () {

                    $.ajax({
                        url: "/api/extra/addCategory",
                        data: {categoryName: $('#categoryName').val()},
                        method: 'POST',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).done(function (data) {
                        if (data.isSuccess === 'true') {
                            $msg.attr('class', 'text-success').text('Category Added');
                        } else {
                            $msg.attr('class', 'text-danger').text(data.message);
                        }
                    }).fail(function (object) {
                        if (object.responseText === 'Unauthorized') {
                            window.alert("Please Login First");
                            window.location.replace('/');
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
                    Name of the minicourse: <input type="text" id="minicourse-name"  required>
                    </label>
                    <br><br>
                    <label>
                    No. of lessons: <input type="text" id="minicourse-no-of-lessons" required>
                    </label>
                    <br><br>
                    <label>
                    Description: <br><textarea cols="60" id="minicourse-description"  required></textarea>
                    </label>
                    <br><br>
                    <label>
                    Duration of the minicourse: <input type="text" id="minicourse-duration" required>
                    </label>
                    <br><br>
                    <label>
                    Level:
                    <label><input type="radio" name="level" value="Beginner" required> Beginner</label>
                    <label><input type="radio" name="level" value="Intermediate"> Intermediate</label>
                    <label><input type="radio" name="level" value="Advance"> Advance</label>
                    </label>
                    <br><br>
                    <label>
                    Medium:
                    <label><input type="radio" name="medium" value="English" required> English</label>
                    <label><input type="radio" name="medium" value="Hindi"> Hindi</label>
                    </label><br><br>
                   `);
                        let classString = "<label>Class : ";
                        for (let i = 0; i < filters.classObject.length; i++) {
                            classString += `<label><input type="radio" name="class" value="` + filters.classObject[i].id + `"> ` + filters.classObject[i].className + ` </label> `
                        }

                        classString += `</label><br><br>`;

                        let subjectString = "<label>Subject : ";
                        for (let i = 0; i < filters.subjectObject.length; i++) {
                            subjectString += `<label><input type="radio" name="subject" value="` + filters.subjectObject[i].id + `"> ` + filters.subjectObject[i].subjectName + ` </label> `
                        }

                        subjectString += `</label><br><br>`;

                        let courseString = "<label>Course : ";
                        for (let i = 0; i < filters.courseObject.length; i++) {
                            courseString += `<label><input type="radio" name="course" value="` + filters.courseObject[i].id + `"> ` + filters.courseObject[i].courseName + ` </label> `
                        }

                        courseString += `</label><br><br>`;

                        let categoryString = "<label>Category : ";
                        for (let i = 0; i < filters.categoryObject.length; i++) {
                            categoryString += `<label><input type="checkbox" name="category" value="` + filters.categoryObject[i].id + `"> ` + filters.categoryObject[i].categoryName + ` </label> `
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
        Name of the Lesson: <input type="text" id="lesson-` + counter + `-name"  required>
    </label>
    <br><br>
    <label>
        Video URL: <input type="text" id="lesson-` + counter + `-videourl" required>
    </label>
    <br><br>
    <label>
        Description: <input type="text" id="lesson-` + counter + `-description" required>
    </label>
    <br><br>
    <label>
        Duration of the minicourse: <input type="text" id="lesson-` + counter + `-duration" required>
    </label>
    <br><br>
    <label>
        Level:
        <label><input type="radio" name="lessonlevel` + counter + `" value="Beginner" required> Beginner</label>
        <label><input type="radio" name="lessonlevel` + counter + `" value="Intermediate"> Intermediate</label>
        <label><input type="radio" name="lessonlevel` + counter + `" value="Advance"> Advance</label>
    </label>
    <br><br>
    
        </li>`);


                            counter++;
                        });

                        console.log(1);

                        $submit.click(function () {
                            categoryIds = [];
                            $('input[name=category]:checked').each(function () {
                                categoryIds.push($(this).val());
                            });
                            console.log(2);
                            miniCourseData = {
                                name: $('#minicourse-name').val(),
                                noOfLessons: $('#minicourse-no-of-lessons').val(),
                                description: $('#minicourse-description').val(),
                                level: $('input[name="level"]:checked').val(),
                                duration: $('#minicourse-duration').val(),
                                medium: $('input[name="medium"]:checked').val(),
                                classId: $('input[name="class"]:checked').val(),
                                subjectId: $('input[name="subject"]:checked').val(),
                                courseId: $('input[name="course"]:checked').val(),
                                categoryIds: categoryIds

                            };

                            $.ajax({
                                url: "/api/tutors/1/addMiniCourse",
                                data: miniCourseData,
                                method: 'POST',
                                headers: {
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            }).done(function (miniCourseFinal) {
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
                                if (lessonData.length !== 0) {

                                    $.ajax({
                                        url: "/api/tutors/1/" + miniCourseFinal.id + "/addLesson",
                                        data: {lessons: lessonData},
                                        method: 'POST',
                                        headers: {
                                            "Authorization": "Bearer " + localStorage.getItem("token")
                                        }
                                    }).done(function (lessons) {
                                        console.log(lessons);
                                    }).fail(function (object) {
                                        if (object.responseText === 'Unauthorized') {
                                            window.alert("Please Login First");
                                            window.location.replace('/');
                                        }
                                    })
                                }
                            }).fail(function (object) {
                                console.log(111111111);
                                if (object.responseText === 'Unauthorized') {
                                    window.alert("Please Login First");
                                    window.location.replace('/');
                                }
                            })
                        })
                    }
                });
            })
        }
        else {
            console.log(2);
            console.log(1);
            alert("You are not allowed");
            window.location.replace("/");
        }
    }).fail(function (object) {
        if (object.responseText === 'Unauthorized') {
            window.alert("Please Login First");
            window.location.replace('/');
        }
    })
});