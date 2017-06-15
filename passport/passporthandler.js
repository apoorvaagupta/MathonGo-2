const passport = require('passport');

const localStudentStrategy = require('./strategies/local/student');
const localTutorStrategy = require('./strategies/local/tutor');
const localAdminStrategy = require('./strategies/local/admin');
const bearerStudentStrategy = require('./strategies/bearer/student');
const bearerTutorStrategy = require('./strategies/bearer/tutor');
const bearerAdminStrategy = require('./strategies/bearer/admin');

passport.serializeUser(function (user, cb) {
    // if (config.DEBUG) {
    //     console.log("Serialize =  = = = ");
    //     console.log(user);
    // }
    //console.log(user);
    return cb(null, user);
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
    return cb(null, userid);
});


passport.use('local-student', localStudentStrategy);
passport.use('local-tutor', localTutorStrategy);
passport.use('local-admin', localAdminStrategy);
passport.use('bearer-student', bearerStudentStrategy);
passport.use('bearer-tutor', bearerTutorStrategy);
passport.use('bearer-admin', bearerAdminStrategy);

module.exports = passport;

