const LocalStrategy = require('passport-local').Strategy;
const models = require('../../db/models').models;

const secrets = require('../../secrets.json');
const password = require('../../utils/password');


/**
 * This is to authenticate _users_ using a username and password
 * via a simple post request
 */

module.exports = new LocalStrategy(function (email, password, done) {

    models.Student.findOne({
        email: email
    }).then(function(student) {
        if (!student) {
            return done(null, false, {message: 'Incorrect Email'});
        }

        password.compare2hash(password, student.password)
            .then(function(match) {
                if (match) {
                    return done(null, student.get());
                } else {
                    return done(null, false, {message: 'Incorrect password'});
                }
            })
            .catch(function (err) {
                console.log(err);
                // console.trace(err.message);
                return cb(err, false, {message: err})
            });

    });

});
