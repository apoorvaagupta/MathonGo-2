const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');
const passport = require('./../../passport/passporthandler');
const ensure = require('./../../passport/passportutils');


router.post('/addClass', passport.authenticate('bearer'), ensure.ensureAdmin(), function (req, res) {
    models.Class.create({
        className: req.body.className
    }).then(function (classObject) {
        res.send({isSuccess: 'true', classObject: classObject});
    }).catch(function (err) {
        console.log(err);
        res.send({isSuccess: 'false', message: "Could not add the class right now"})
    });
});

router.post('/addSubject',  passport.authenticate('bearer'), ensure.ensureAdmin(),function (req, res) {
    models.Subject.create({
        subjectName: req.body.subjectName
    }).then(function (subject) {
        res.send({isSuccess: 'true', subjectObject: subject});
    }).catch(function (err) {
        console.log(err);
        res.send({isSuccess: 'false', message: "Could not add the subject right now"})
    });
});

router.post('/addCategory',  passport.authenticate('bearer'), ensure.ensureAdmin(),function (req, res) {
    models.Category.create({
        categoryName: req.body.categoryName
    }).then(function (category) {
        res.send({isSuccess: 'true', categoryObject: category});
    }).catch(function (err) {
        console.log(err);
        res.send({isSuccess: 'false', message: "Could not add the category right now"})
    });
});
router.post('/addCourse',  passport.authenticate('bearer'), ensure.ensureAdmin(),function (req, res) {
    models.Course.create({
        courseName: req.body.courseName
    }).then(function (course) {
        res.send({isSuccess: 'true', courseObject: course});
    }).catch(function (err) {
        console.log(err);
        res.send({isSuccess: 'false', message: "Could not add the course right now"})
    });
});

router.get('/filters', function (req, res) {
    models.Class.findAll().then(function (classObject) {
        models.Subject.findAll().then(function (subjectObject) {
            models.Category.findAll().then(function (categoryObject) {
                models.Course.findAll().then(function (courseObject) {
                    res.send({
                        isSuccess: 'true',
                        classObject: classObject,
                        subjectObject: subjectObject,
                        categoryObject: categoryObject,
                        courseObject: courseObject
                    })
                }).catch(function (err) {
                    console.log(err);
                    res.send({isSuccess: 'false'})
                })
            }).catch(function (err) {
                console.log(err);
                res.send({isSuccess: 'false'})
            })
        }).catch(function (err) {
            console.log(err);
            res.send({isSuccess: 'false'})
        })
    }).catch(function (err) {
        console.log(err);
        res.send({isSuccess: 'false'})
    })
});
module.exports = router;
