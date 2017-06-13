const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.get('/', function (req, res) {
    //get all the minicourses
    models.MiniCourse.findAll({
        include:[models.Tutor,models.Tag]
    }).then(function (miniCourses) {
        res.send(miniCourses);
    }).catch(function (err) {
        console.log(err);
        res.send("Could not send all the minicourses");
    })
});

router.get('/:id', function (req, res) {
    //get a particular minicourse along all its lectures
    let miniCourseId = parseInt(req.params.id);
    models.MiniCourse.findOne({
        where: {id: miniCourseId},
        include: [models.Lesson,models.Tutor,models.Tag]
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
    //Ask
});
//Ask
router.post('/:minicourse/review', function (req, res) {
    //review this minicourse
});

module.exports = router;
