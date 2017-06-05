const router = require('express').Router();
const passport = require('../../passport/passporthandler');

app.post('/login',
    passport.authenticate('local', { successRedirect: '/minicourses',
        failureRedirect: '/login'})
);

module.exports = router;
