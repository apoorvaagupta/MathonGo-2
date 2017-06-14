const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.get('/', function (req, res) {
    //Get All Tags

    models.MiniCourse.findAll({
        include: [
            {
                model: models.Tutor
            },
            {
                model: models.Tag,
                include: [models.Class, models.Subject, models.Course, models.Category]
            }
        ]
    }).then(function (miniCourses) {
        res.send(miniCourses);
    }).catch(function (err) {
        console.log(err);
        res.send("Could not send all the minicourses");
    })
});

router.get('/:id', function (req, res) {
    //get a particular minicourse along all its lectures
    //Get All Tags
    let miniCourseId = parseInt(req.params.id);
    models.MiniCourse.findOne({
        where: {id: miniCourseId},
        include: [
            {
                model: models.Lesson
            },
            {
                model: models.Tutor
            },
            {
                model: models.Tag,
                include: [models.Class, models.Subject, models.Course, models.Category]
            }
        ]
    }).then(function (miniCourse) {
        //Write for enrollment
        res.send(miniCourse);
    }).catch(function (err) {
        console.log(err);
        res.send("Could not get this lesson right now");
    })
});

router.post('/withFilters', function (req, res) {
    if (!req.body.hasOwnProperty('filter')) {
        models.MiniCourse.findAll().then(function (minicourses) {
            return res.send(minicourses);
        }).catch(function (err) {
            console.log(err);
            return res.send("Could not get the minicourses right now")
        })
    } else {
        console.log(req.body.filter);
        // let classArray = req.body.filter.hasOwnProperty('classObject') ? req.body.filter.classObject.map(parseInt) : [0],
        //     subjectArray = req.body.filter.hasOwnProperty('subjectObject') ? req.body.filter.subjectObject.map(parseInt) : [0],
        //     categoryArray = req.body.filter.hasOwnProperty('categoryObject') ? req.body.filter.categoryObject.map(parseInt) : [0],
        let difficultyArray = req.body.filter.hasOwnProperty('difficultyObject') ? req.body.filter.difficultyObject : [''],
            mediumArray = req.body.filter.hasOwnProperty('mediumObject') ? req.body.filter.mediumObject : [''];
        //
        // console.log(classArray);
        //
        for (let i = 0; i < difficultyArray.length; i++) {
            difficultyArray[i] = difficultyArray[i] === '1' ? 'Beginner' : difficultyArray[i] === '2' ? 'Intermediate' : difficultyArray[i] === '3' ? 'Advance' : '';
        }

        for (let i = 0; i < mediumArray.length; i++) {
            mediumArray[i] = mediumArray[i] === '1' ? 'English' : mediumArray[i] === '1' ? 'Hindi' : '';
        }


        let options = {};
        if (req.body.filter.hasOwnProperty('classObject')) {
            options['$tags.classId$'] = {$in: req.body.filter.classObject.map(parseInt)};
        }

        if (req.body.filter.hasOwnProperty('subjectObject')) {
            options['$tags.subjectId$'] = {$in: req.body.filter.subjectObject.map(parseInt)};
        }

        if (req.body.filter.hasOwnProperty('categoryObject')) {
            options['$tags.categoryId$'] = {$in: req.body.filter.categoryObject.map(parseInt)};
        }

        if (req.body.filter.hasOwnProperty('mediumObject')) {
            options['medium'] = {$in: mediumArray};
        }

        if (req.body.filter.hasOwnProperty('difficultyObject')) {
            options['level'] = {$in: difficultyArray};
        }


        models.MiniCourse.findAll({
            where: options
            // '$tags.classId$': classArray.indexOf(0) === 0 ? {$notIn: [0]} : {$in: classArray},
            // '$tags.subjectId$': subjectArray.indexOf(0) === 0 ? {$notIn: [0]} : {$in: subjectArray},
            // '$tags.categoryId$': categoryArray.indexOf(0) === 0 ? {$notIn: [0]} : {$in: categoryArray},
            // medium: mediumArray[0].length === 0 ? {$notIn: ['']} : {$in: mediumArray},
            // level: difficultyArray[0].length === 0 ? {$notIn: ['']} : {$in: difficultyArray}
            ,
            include: [
                {
                    model: models.Tutor
                },
                {
                    model: models.Tag,
                    include: [models.Class, models.Subject, models.Course, models.Category]
                }
            ]
        }).then(function (miniCourses) {
            res.send(miniCourses);
        }).catch(function (err) {
            console.log(err);
            res.send("Could not send all the minicourses");
        })
    }
});

router.post('/:id/enrol', function (req, res) {
    //enrol in a minicourse
    let miniCourseId = parseInt(req.params.id);
    //DO AFTERWARDS
    //Ask
});
//Ask
router.post('/:minicourse/review', function (req, res) {
    //review this minicourse
    //PHASE 2
});

module.exports = router;
