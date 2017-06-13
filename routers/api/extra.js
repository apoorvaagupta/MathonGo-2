const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.post('/addClass', function (req, res) {
    models.Class.create({
        className: req.body.className
    }).then(function (classObject) {
        res.send(classObject)
    }).catch(function (err) {
        console.log(err);
        res.send("Could not add the class right now")
    });
});

router.post('/addSubject', function (req, res) {
    models.Subject.create({
        subjectName: req.body.subjectName
    }).then(function (subject) {
        res.send(subject)
    }).catch(function (err) {
        console.log(err);
        res.send("Could not add the subject right now")
    });
});

router.post('/addCategory', function (req, res) {
    models.Category.create({
        categoryName: req.body.categoryName
    }).then(function (category) {
        res.send(category)
    }).catch(function (err) {
        console.log(err);
        res.send("Could not add the category right now")
    });
});
router.post('/addCourse', function (req, res) {
    models.Course.create({
        courseName: req.body.courseName
    }).then(function (course) {
        res.send(course)
    }).catch(function (err) {
        console.log(err);
        res.send("Could not add the course right now")
    });
});


module.exports = router;
