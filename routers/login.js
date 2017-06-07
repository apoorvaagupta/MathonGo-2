const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/', passport.authenticate('local'), function (req,res) {
    // req.user={};
    console.log(req.user);
    res.redirect('/library');
});

module.exports = router;
