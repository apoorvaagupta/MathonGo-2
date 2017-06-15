const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/student', passport.authenticate('local-student'), function (req, res) {

        res.send({success: 'true', url: 'http://localhost:4000/library/'});
    }
);

module.exports = router;
