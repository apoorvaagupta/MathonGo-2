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

router.post('/:id/enrol', function (req, res) {
    //enrol in a minicourse
    let miniCourseId = parseInt(req.params.id);
    //DO AFTERWARDS
    //Ask
});
//Ask
router.post('/:minicourse/review', function (req, res) {
    //review this minicourse
});

module.exports = router;
