const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.get('/:id', function (req, res) {
    //get the lecture of this id
    let lessonId = req.params.id;
    models.Lesson.findOne({
        where: {
            id: lessonId
        },
    }).then(function (lesson) {
        res.send(lesson);
    }).catch(function (err) {
        console.log(err);
        res.send("Could not get this lesson right now");
    })
});

router.post('/:lessonId/bookmark', function (req, res) {
    //bookmark this lesson
});

router.post('/:lessonId/report', function (req, res) {
    //report this lesson
});

router.post('/:lessonId/upvote', function (req, res) {
    //upvote this lesson
});

module.exports = router;
