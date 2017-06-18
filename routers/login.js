const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/student', passport.authenticate('local-student'), function (req, res) {

        res.send({success: 'true', name: req.user.name, url: '/library/'});
    }
);

module.exports = router;

