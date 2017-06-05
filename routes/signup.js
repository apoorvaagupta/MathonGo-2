const router = require('express').Router();
const models = require('../db/models').models;
const password = require('../utils/password');

router.post('/', function (req, res) {

    if (req.body.firstname === "" || req.body.lastname === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.Student.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }).then(function (student) {
            res.redirect('/login');
        })
    }).catch(function (err) {
        console.log(err);
        res.send("Could not create the user");
    })
});

module.exports = router;
