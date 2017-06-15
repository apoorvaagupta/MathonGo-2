const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('./../../../db/models').models;

module.exports = new BearerStrategy(function (token, done) {
    models.AuthTutor.findOne({
        where: {
            token: token
        },
        include: [models.Tutor]
    }).then(function (authToken) {
        if (authToken && authToken.tutor) {
            return done(null, authToken.tutor);
        } else {
            return done(null, false, {message: 'Could not authorize'})
        }
    }).catch(function (err) {
        console.log(err);
        return done(err, false);
    })
});