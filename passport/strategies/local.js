const LocalStrategy = require('passport-local').Strategy;
const models = require('./../../db/models').models;


const secrets = require('./../../secrets.json');
const passutils = require('./../../utils/password');


/**
 * This is to authenticate _users_ using a username and password
 * via a simple post request
 */

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    console.log(11111);
    console.log(email);
    console.log(password);
    models.Student.findOne({
       where: {email: email}
    }).then(function (student) {
        passutils.compare2hash(password, student.password).then(function (match) {
            if (match) {
                console.log("returning");
                return done(null, student.get());
            } else {
                return done(null, false, {message: 'Incorrect password'});
            }
        }).catch(function (err) {
            console.log(err);
            return done(err, false, {message: err})
        });

    }).catch(function (err) {
        console.log(err);
        return done(err,false,{message: 'invalid user'});
    });

});
