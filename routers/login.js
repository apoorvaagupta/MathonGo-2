const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/', passport.authenticate('local'), function (req,res) {

    console.log("login router");
    console.log(req.user);
    res.redirect('/library');
    console.log("no redirection");

});

module.exports = router;
