const router = require('express').Router();
const passport = require('../passport/passporthandler');

router.get('/',
    passport.authenticate('local')
    // , function (req,res) {
    //     console.log("login router");
    //     console.log(req.User);
    //     console.log(res);
    //     console.log(req);
    // }
);

module.exports = router;
