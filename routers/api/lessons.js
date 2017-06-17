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

router.post('/:id/bookmark', function (req, res) {
    let lessonId = parseInt(req.params.id);
    models.Bookmark.create({
        lessonId: lessonId,
        studentId: req.user.id
    }).then(function (bookmark) {
        if (bookmark) {
            res.send({success: 'true'})
        } else {
            res.send({success: 'false'})
        }
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'})
    });
});

router.post('/:lessonId/report', function (req, res) {
    //report this lesson
    //PHASE 2
});

router.post('/:lessonId/upvote', function (req, res) {
    //PHASE 2
    //upvote this lesson
});

module.exports = router;
