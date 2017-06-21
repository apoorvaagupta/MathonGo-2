const router = require('express').Router();
const models = require('./../db/models').models;
const uid = require('uid2');
const passutils = require('./../utils/password');

router.post('/', (req, res) => {
    models.UserLocal.findOne({
        where: {
            email: req.body.email,
        }
    }).then(function (user) {
        if (!user) {
            return res.send({
                success: "true",
                message: "invalid email"
            })
        }
        passutils.compare2hash(req.body.password, user.password).then(function (match) {
            if (match) {
                models.AuthToken.create({
                    token: uid(30),
                    role: user.role
                }).then(function (authToken) {
                    res.send({
                        success: 'true',
                        token: authToken.token
                    })
                }).catch(function (err) {
                    console.log(err);
                    res.send({success: 'false'})
                })
            } else {
                res.send({success: 'false'})
            }
        }).catch(function (err) {
            console.log(err);
            res.send({success: 'false'});
        });


    }).catch(function (err) {
        console.log(err);
        res.send({success: 'false'});
    });

});
module.exports = router;
