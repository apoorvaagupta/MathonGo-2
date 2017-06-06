const passport = require('passport');

const localStrategy = require('./strategies/local');

const models = require('../db/models').models;

const config = require('../config');

passport.use(localStrategy);

passport.serializeUser(function (user, cb) {
    if (config.DEBUG) {
        console.log("Serialize =  = = = ");
        console.log(user);
    }

    cb(null, user.id);
});

passport.deserializeUser(function (userid, cb) {
    if (config.DEBUG) {
        console.log("Deserialize =  = = = ");
        console.log(userid);
    }
    models.User.findOne({
        where: {id: userid}
    }).then(function(user) {
        return cb(null, user)
    })
});

module.exports = passport;

