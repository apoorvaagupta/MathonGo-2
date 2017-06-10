const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');


router.post('/add', function (req, res) {
    if (req.body.firstname === "" || req.body.lastname === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.Tutor.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
        }).then(function (student) {
            res.send(student);
        })
    })
});


//will have to think about the method being get or post
router.get('/login', function (req, res) {

});

router.get('/:id', function (req, res) {
    // models.Student.findOne({
    //     where: {id: req.params.id}
    // }).then(function (student) {
    //     res.send(student);
    // }).catch(function (err) {
    //     console.log(err);
    //     res.send('Unknown Student');
    // })
});

router.post('/:id/edit', function (req, res) {
    let tutorId = parseInt(req.params.id),
        email = req.body.email,
        name = req.body.name,
        description = req.body.description;

    models.Tutor.update({
        email: email,
        name: name,
        description: description
    }, {
        where: {id: studentId},
        returning: true
    }).then(function (rows) {
        res.send(rows[1][0].get());
    }).catch(function (error) {
        console.error(error)
    });
});

router.get('/:id/myMinicourses', function (req, res) {
    //tutor gets all his minicourses,
});

router.get('/:id/:minicourses', function (req, res) {
    //tutor sees a minicourse with review on it
});

router.get('/:id/:minicourse/:lesson', function (req, res) {
    //tutor sees a lesson with all its reports and no of upvotes
});


router.post('/:id/addMinicourse', function (req, res) {
    //will have to decide how to add tags to a minicourse
});

router.post('/:id/:minicourseId/addLesson', function (req, res) {

});


module.exports = router;