const router = require('express').Router();
const models = require('../db/models').models;
const password = require('../utils/password');

router.post('/student', function (req, res) {

    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.UserLocal.create({
            email: req.body.email,
            password: hash,
            role: "Student",
            student: {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                class: req.body.class
            }
        }, {
            include: [models.Student]
        }).then(function (userLocal) {
            console.log(userLocal.get());
            console.log("=-----------------=");
            console.log(userLocal.student.get());
            if (userLocal) {
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

router.post('/tutor', function (req, res) {

    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.UserLocal.create({
            email: req.body.email,
            password: hash,
            role: "Tutor",
            tutor: {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                description: req.body.description
            }
        }, {
            include: [models.Tutor]
        }).then(function (userLocal) {
            if (userLocal) {
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


router.post('/admin', function (req, res) {

    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.UserLocal.create({
            email: req.body.email,
            password: hash,
            role: "Admin",
            admin: {
                name: req.body.name,
                email: req.body.email,
            }
        }, {
            include: [models.Admin]
        }).then(function (userLocal) {
            if (userLocal) {
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
