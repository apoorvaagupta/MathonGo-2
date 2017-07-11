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

router.get('/allClasses', function (req, res) {
    models.Class.findAll().then(function (classes) {
        if (classes)
            return res.send({success: 'true', data: classes})
        else
            return res.send({success: 'false', data: "no classes found"})
    }).catch(function (err) {
        return res.send({success: 'false', data: "Error"})
    })
});

router.post('/deleteClass', function (req,res) {
    models.Class.destroy({
        where: {}
    }).then(function () {

    }).catch(function (err) {
        console.log(err);
        return res.send({success: 'false', data: "Error"})
    })
})

router.post('/addSubject', passport.authenticate('bearer'), ensure.ensureAdmin(), function (req, res) {
    models.Subject.create({
        subjectName: req.body.subjectName
    }).then(function (subject) {
        res.send({isSuccess: 'true', subjectObject: subject});
    }).catch(function (err) {
        console.log(err);
        res.send({isSuccess: 'false', message: "Could not add the subject right now"})
    });
});

router.get('/allSubjects', function (req, res) {
    models.Subject.findAll().then(function (subjects) {
        if (subjects)
            return res.send({success: 'true', data: subjects})
        else
            return res.send({success: 'false', data: "no subjects found"})
    }).catch(function (err) {
        return res.send({success: 'false', data: "Error"})
    })
})

router.post('/addCategory', passport.authenticate('bearer'), ensure.ensureAdmin(), function (req, res) {
    models.Category.create({
        categoryName: req.body.categoryName
    }).then(function (category) {
        res.send({isSuccess: 'true', categoryObject: category});
    }).catch(function (err) {
        console.log(err);
        res.send({isSuccess: 'false', message: "Could not add the category right now"})
    });
});

router.get('/allCategories', function (req, res) {
    models.Category.findAll().then(function (categories) {
        if (categories)
            return res.send({success: 'true', data: categories})
        else
            return res.send({success: 'false', data: "no categories found"})
    }).catch(function (err) {
        return res.send({success: 'false', data: "Error"})
    })
})

router.post('/addCourse', passport.authenticate('bearer'), ensure.ensureAdmin(), function (req, res) {
    models.Course.create({
        courseName: req.body.courseName
    }).then(function (course) {
        res.send({isSuccess: 'true', courseObject: course});
    }).catch(function (err) {
        console.log(err);
        res.send({isSuccess: 'false', message: "Could not add the course right now"})
    });
});

router.get('/allCourses', function (req, res) {
    models.Course.findAll().then(function (course) {
        if (course)
            return res.send({success: 'true', data: course})
        else
            return res.send({success: 'false', data: "no courses found"})
    }).catch(function (err) {
        return res.send({success: 'false', data: "Error"})
    })
})

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
