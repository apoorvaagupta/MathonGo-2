const passport = require('passport');

const localStrategy = require('./strategies/local/localstrategy');
const bearerStrategy = require('./strategies/bearer/bearerstrategy');

passport.serializeUser(function (user, cb) {
    return cb(null, user);
});
//
passport.deserializeUser(function (userid, cb) {
    return cb(null, userid);
});


passport.use('local', localStrategy);
passport.use('bearer', bearerStrategy);

module.exports = passport;

