const passport = require('passport');

const localStudentStrategy = require('./strategies/local/student');
const localTutorStrategy = require('./strategies/local/tutor');
const localAdminStrategy = require('./strategies/local/admin');

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



passport.use('student', localStudentStrategy);
passport.use('tutor', localTutorStrategy);
passport.use('admin', localAdminStrategy);

module.exports = passport;

