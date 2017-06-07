const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/', passport.authenticate('local'), function (req,res) {
    console.log(2);
    console.log(req.user);
    // console.log(res);
});

module.exports = router;
