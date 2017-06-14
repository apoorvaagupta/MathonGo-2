const passport = require('passport');

const localStrategy = require('./strategies/local');





passport.serializeUser(function (user, cb) {
    // if (config.DEBUG) {
    //     console.log("Serialize =  = = = ");
    //     console.log(user);
    // }
    //console.log(user);
     return cb(null,user);
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

   // console.log(userid);
     return cb(null,userid);
});

passport.use(localStrategy);

module.exports = passport;

