const passport = require('passport');

const localStrategy = require('./strategies/local');


passport.use(localStrategy);


passport.serializeUser(function (user, cb) {
    // if (config.DEBUG) {
    //     console.log("Serialize =  = = = ");
    //     console.log(user);
    // }

    cb(null, user);
});
//
passport.deserializeUser(function (userid, cb) {
    // if (config.DEBUG) {
    //     console.log("Deserialize =  = = = ");
    //     console.log(userid);
    // }
    // // models.User.findOne({
    // //     where: {id: userid}
    // // }).then(function(user) {
    // //     return cb(null, user)
    // // })
    cb(null,userid);
});

module.exports = passport;

