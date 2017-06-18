$(document).ready(function () {
    $msg = $('#msg');
    $form = $('#dataForm');
    $form.submit(function (e) {
        e.preventDefault();
    });

    $('#classButton').click(function () {
        $form.text("");
        $form.append(`
            <label>
            Class name : <input type="text" id="className">
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
        $submit = $('#submit');
        $submit.unbind('click');
        $submit.click(function () {
            $.post("http://localhost:4000/api/extra/addClass", {
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
        $form.append(`
            <label>
            Subject name : <input type="text" id="subjectName">
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
        $submit = $('#submit');
        $submit.unbind('click');
        $submit.click(function () {
            $.post("http://localhost:4000/api/extra/addSubject", {
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
        $form.append(`
            <label>
            Course name : <input type="text" id="courseName">
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
        $submit = $('#submit');
        $submit.unbind('click');
        $submit.click(function () {
            $.post("http://localhost:4000/api/extra/addCourse", {
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
        $form.append(`
            <label>
            Category name : <input type="text" id="categoryName">
            </label>
            <button class="btn buttons" id="submit">Submit</button>
        `);
        $submit = $('#submit');
        $submit.unbind('click');
        $submit.click(function () {
            $.post("http://localhost:4000/api/extra/addCategory", {
                courseName: $('#categoryName').val()
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
        $.get("http://localhost:4000/api/extra/filters", function (filters) {
            if (filters.isSuccess === 'true') {
                $form.append(`
                    <label>
                    Name of the minicourse: <input type="text" id="minicourse-name">
                    </label>
                    <br><br>
                    <label>
                    No. of lessons: <input type="text" id="minicourse-lessonNo">
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
                    <label><input type="radio" name="medium" value="english"> English</label>
                    <label><input type="radio" name="medium" value="hindi"> Hindi</label>
                    </label><br>
                    <button class="btn buttons" id="submit">Submit</button>
                `);
                let classString="";
                for (let i = 0; i < filters.classObject.length; i++) {

                }


                $submit = $('#submit');
                $submit.unbind('click');
                $submit.click(function () {
                    $.post("http://localhost:4000/api/extra/addCategory", {
                        courseName: $('#categoryName').val()
                    }, function (data) {
                        if (data.isSuccess === 'true') {
                            $msg.attr('class', 'text-success').text('Course Added');
                        } else {
                            $msg.attr('class', 'text-danger').text(data.message);
                        }
                    })
                })
            }
        });
    })
});