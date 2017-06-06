const router = require('express').Router();
const passport = require('../passport/passporthandler');

router.post('/', passport.authenticate('local'), function (req,res) {
    console.log(req);
    console.log(res);
});

module.exports = router;
