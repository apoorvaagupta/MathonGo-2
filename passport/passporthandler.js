const passport = require('passport');

const UserStrategies = require('./strategies/user')
    , ClientStrategies = require('./strategies/client')
    , ApiStrategies = require('./strategies/api');

const models = require('../db/models').models;

const config = require('../config');

passport.use(UserStrategies.localStrategy);
passport.use(UserStrategies.fbStrategy);
passport.use(UserStrategies.twitterStrategy);
passport.use(UserStrategies.githubStrategy);
passport.use(UserStrategies.lmsStrategy);

passport.use(ClientStrategies.basicStrategy);
passport.use(ClientStrategies.clientPasswordStrategy);

passport.use(ApiStrategies.bearerStrategy);

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

