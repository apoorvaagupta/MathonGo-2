const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.get('/',function (req,res) {
    //get all the minicourses
});

router.get('/:miniCourseId',function (req,res) {
    //get a particular minicourse along all its lectures
});

router.post('/:minicourse/enrol',function (req,res) {
    //enrol in a minicourse
});

router.review('/:minicourse/review', function (req,res) {
    //review this minicourse
});

module.exports = router;
