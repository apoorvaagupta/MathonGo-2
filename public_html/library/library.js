/**
 * Created by apoorvaa_gupta on 13/6/17.
 */


$('document').ready(function () {

    $.get("http://localhost:4000/api/minicourses", addMiniCourses);

    $.get("http://localhost:4000/api/extra/filters", function (filters) {

        const allFilter = $('#allFilters');
        let categoryString = `<div class="filter-column-divs">
                    <div class="filter-column-divs-heading"><b>CATEGORY</b></div>
                    <div class="filter-column-divs-content">`;
        for (let i = 0; i < filters.categoryObject.length; i++) {
            categoryString += `
                        <label class="label-style">
                            <input name="category" value="` + filters.categoryObject[i].id + `" type="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;` + filters.categoryObject[i].categoryName + `<br/>
                        </label>
                        <br>
                    `;
        }
        categoryString += `</div></div>`;
        allFilter.append(categoryString);


        let subjectString = `<div class="filter-column-divs">
                    <div class="filter-column-divs-heading"><b>SUBJECT</b></div>
                    <div class="filter-column-divs-content">`;
        for (let i = 0; i < filters.subjectObject.length; i++) {
            subjectString += `
                        <label class="label-style">
                            <input name="subject" value="` + filters.subjectObject[i].id + `" type="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;` + filters.subjectObject[i].subjectName + `<br/>
                        </label>
                        <br>
                    `;
        }
        subjectString += `</div></div>`;
        allFilter.append(subjectString);


        let classString = `<div class="filter-column-divs">
                    <div class="filter-column-divs-heading"><b>CLASS</b></div>
                    <div class="filter-column-divs-content">`;
        for (let i = 0; i < filters.classObject.length; i++) {
            classString += `
                        <label class="label-style">
                            <input name="class" value="` + filters.classObject[i].id + `" type="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;` + filters.classObject[i].className + `<br/>
                        </label>
                        <br>
                    `;
        }
        classString += `</div></div>`;
        allFilter.append(classString);


        allFilter.append(`<div class="filter-column-divs">
                    <div class="filter-column-divs-heading"><b>DIFFICULTY</b></div>
                    <div class="filter-column-divs-content">
                        <label class="label-style">
                            <input name="difficulty" value="1" type="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;Beginner<br/>
                        </label>
                        <br>
                        <label class="label-style">
                            <input name="difficulty" value="2" type="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;Intermediate<br>
                        </label>
                        <br>
                        <label class="label-style">
                            <input name="difficulty" value="3" type="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;Advanced<br>
                        </label>
                    </div>
                </div>
                <div class="filter-column-divs">
                    <div class="filter-column-divs-heading"><b>MEDIUM</b></div>
                    <div class="filter-column-divs-content">
                        <label class="label-style">
                            <input name="medium" value="1" type="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;English<br/>
                        </label>
                        <br>
                        <label class="label-style">
                            <input name="medium" value="2" type="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;Hindi<br>
                        </label>

                    </div>
                </div>`);

        $('input[type="checkbox"]').change(function () {
            let categoryArray = [];
            let subjectArray = [];
            let classArray = [];
            let difficultyArray = [];
            let mediumArray = [];


            const categoryFilters = $('input[name="category"]');
            const subjectFilters = $('input[name="subject"]');
            const classFilters = $('input[name="class"]');
            const difficultyFilters = $('input[name="difficulty"]');
            const mediumFilters = $('input[name="medium"]');

            for (let i = 0; i < categoryFilters.length; i++) {
                if (categoryFilters[i].checked) {
                    categoryArray.push(categoryFilters[i].value);
                }
            }

            for (let i = 0; i < subjectFilters.length; i++) {
                if (subjectFilters[i].checked) {
                    subjectArray.push(subjectFilters[i].value);
                }
            }

            for (let i = 0; i < classFilters.length; i++) {
                if (classFilters[i].checked) {
                    classArray.push(classFilters[i].value);
                }
            }

            for (let i = 0; i < difficultyFilters.length; i++) {
                if (difficultyFilters[i].checked) {
                    difficultyArray.push(difficultyFilters[i].value);
                }
            }

            for (let i = 0; i < mediumFilters.length; i++) {
                if (mediumFilters[i].checked) {
                    mediumArray.push(mediumFilters[i].value);
                }
            }

            const filter = {
                a:'a',  //Just so that filter is never empty
                classObject: classArray,
                subjectObject: subjectArray,
                categoryObject: categoryArray,
                difficultyObject: difficultyArray,
                mediumObject: mediumArray
            };

            $.post("http://localhost:4000/api/minicourses/withFilters", {
                filter: filter
            }, addMiniCourses);
        });

    });


});

function addMiniCourses(minicourses) {
    console.log(minicourses);
    const ul = $('#minicourses-list');
    ul.empty();
    for (let i = 0; i < 2; i++) {
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
}