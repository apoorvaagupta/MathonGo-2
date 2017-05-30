const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.get('/:lessonId', function (req, res) {
    //get the lecture of this id
});

router.post('/:lessonId/bookmark', function (req, res) {
    //bookmark this lesson
});

router.post('/:lessonId/report', function (req, res) {
    //report this lesson
});

router.post('/:lessonId/upvote', function (req,res) {
    //upvote this lesson
});

module.exports = router;
