const router = require('express').Router();
const models = require('../db/models').models;
const password = require('../utils/password');
const passport = require('./../passport/passporthandler');
router.post('/student', function (req, res) {

    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.StudentLocal.create({
            email: req.body.email,
            password: hash,
            student: {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                class: req.body.class
            }
        }, {
            include: [models.Student]
        }).then(function (studentLocal) {
            if (studentLocal) {
                res.send({success: 'true'});
            } else {
                res.send({success: 'false'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({success: 'error'});
        })
    }).catch(function (err) {
        console.log(err);
        res.send({success: 'error'});
    })
});

module.exports = router;
