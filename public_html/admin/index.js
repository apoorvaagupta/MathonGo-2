/**
 * Created by apoorvaa_gupta on 12/6/17.
 */
$('document').ready(function () {

    counter = 0;

    $('#add-lesson-btn').click(function () {
       let lessonlist = $('#lessons-add');
       counter++;

       lessonlist.append(`<li>
            <label>
        Name of the Lesson: <input type="text" id="lesson`+counter+`-name">
    </label>
    <br><br>
    <label>
        Video URL: <input type="text" id="lesson`+counter+`-videourl">
    </label>
    <br><br>
    <label>
        Description: <input type="text" id="lesson`+counter+`-description">
    </label>
    <br><br>
    <label>
        Duration of the minicourse: <input type="text" id="lesson`+counter+`-duration">
    </label>
    <br><br>
    <label>
        Level:
        <label><input type="radio" name="lessonlevel`+counter+`" value="beginner"> Beginner</label>
        <label><input type="radio" name="lessonlevel`+counter+`" value="intermediate"> Intermediate</label>
        <label><input type="radio" name="lessonlevel`+counter+`" value="advance"> Advance</label>
    </label>
    <br><br>
    
        </li>`)
    });


});