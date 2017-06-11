const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/', passport.authenticate('local'), function (req,res) {

    console.log("login router");
    console.log(req.user);
    console.log("final step");
   return  res.send('http://localhost:4000/library');


});

module.exports = router;
