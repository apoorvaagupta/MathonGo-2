const LocalStrategy = require('passport-local').Strategy;
const models = require('../../db/models').models;

const secrets = require('../../secrets.json');
const passutils = require('../../utils/password');


/**
 * This is to authenticate _users_ using a username and password
 * via a simple post request
 */

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {

    models.Student.findOne({
        email: email
    }).then(function (student) {


        passutils.compare2hash(password, student.password)
            .then(function (match) {
                console.log(match);
                if (!match) {
                    return done(null, false, {message: 'Incorrect password'});
                } else {
                    return done(null, student.get());

                }
            })
            .catch(function (err) {
                console.log(err);
                // console.trace(err.message);
                return cb(err, false, {message: err})
            });

    });

});
