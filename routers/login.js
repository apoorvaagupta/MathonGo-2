const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/', passport.authenticate('local'), function (req,res) {

    console.log(req.user);
});

module.exports = router;
