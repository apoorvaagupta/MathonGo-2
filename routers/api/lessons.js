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
        models.Enrollment.findOne({
            where: {
                studentId: req.user.user.id,
                minicourseId: lesson.minicourseId
            }
        }).then(function (enrollment) {
            if (enrollment) {
                res.send({success: 'true', lesson: lesson.get()})
            } else {
                res.send({success: 'false', miniCourseId: lesson.minicourseId})
            }
        }).catch(function (err) {
            console.log(err);
            res.send("Could not get this lesson right now");
        })
    }).catch(function (err) {
        console.log(err);
        res.send("Could not get this lesson right now");
    })
});

router.post('/:id/bookmark', function (req, res) {
    let lessonId = parseInt(req.params.id);
    models.Bookmark.create({
        lessonId: lessonId,
        studentId: req.user.user.id
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


router.get('/:id/isBookmarked', function (req, res) {
    let lessonId = parseInt(req.params.id);
    models.Bookmark.findOne({
        where: {
            lessonId: lessonId,
            studentId: req.user.user.id
        }
    }).then(function (enrollment) {
        if (enrollment) {
            res.send({isBookmarked: 'true'});
        } else {
            res.send({isBookmarked: 'false'});
        }
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'false', message: 'Could not get the bookmark right now'})
    })
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
