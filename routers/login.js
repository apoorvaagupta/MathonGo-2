const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/student', passport.authenticate('local-student'), function (req, res) {

        res.send({success: 'true', name: req.user.name, url: 'http://ec2-35-154-176-212.ap-south-1.compute.amazonaws.com:4000/library/'});
    }
);

module.exports = router;

