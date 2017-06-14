const router = require('express').Router();
const passport = require('./../passport/passporthandler');

router.post('/', passport.authenticate('local', {
        failureRedirect: 'http://localhost:4000/lesson/',

    }), function (req, res) {
        console.log(req.user);
        res.redirect('/library/');
    }
);

module.exports = router;
