const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.get('/', function (req, res) {

});

router.post('/add', function (req, res) {
    if (req.body.firstname === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.Student.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }).then(function (student) {
            res.send(student);
        }).catch(function (err) {
            console.log(err);
            res.send("Could not create the user");
        })
    }).catch(function (err) {
        console.log(err);
        res.send("Could not create the user");
    })
});
//
// router.get('/:id', function (req, res) {
//     models.Student.findOne({
//         where: {id: req.params.id}
//     }).then(function (student) {
//         res.send(student);
//     }).catch(function (err) {
//         console.log(err);
//         res.send('Unknown Student');
//     })
// });

router.post('/:id/edit', function (req, res) {
    // let studentId = parseInt(req.params.id);
    // email = req.body.email;
    // contact = req.body.contact;
    // pincode = req.body.pincode;
    // education = req.body.education;
    // skills = req.body.skills;
    // languages = req.body.languages;
    // projects = req.body.projects;
    // trainings = req.body.trainings;
    //
    // models.Student.update({
    //     email: email,
    //     contact: contact,
    //     pincode: pincode,
    //     education: education,
    //     skills: skills,
    //     languages: languages,
    //     projects: projects,
    //     trainings: trainings
    // }, {
    //     where: {id: studentId}
    // }).then(function (student) {
    //     res.send(student);
    // }).catch(function (error) {
    //     console.error(error)
    // });
});

router.get('/mycourses', function (req, res) {
    models.Enrollment.findAll({
        where: {studentId: req.user.id},
        include: [
            {
                model: models.MiniCourse,
                include: [{
                    model: models.Tutor
                },
                    {
                        model: models.Tag,
                        include: [models.Class, models.Category, models.Course, models.Subject]
                    }
                ]
            }
        ]
    }).then(function (enrollments) {
        res.send(enrollments);
    }).catch(function (error) {
        console.log(error);
    })
});

router.get('/:id/bookmarks', function (req, res) {
    //console.log("reached");
    let studentId = parseInt(req.params.id);
    models.Bookmark.findAll({
        where: {studentId: studentId},
             include: models.Lesson

    }).then(function (bookmarks) {
        res.send(bookmarks);
    }).catch(function (error) {
        console.log(error);
    })
});


module.exports = router;
