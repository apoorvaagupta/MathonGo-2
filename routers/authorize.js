const router = require('express').Router();
const models = require('./../db/models').models;
const uid = require('uid2');
const passutils = require('./../utils/password');

router.post('/', (req, res) => {
    models.UserLocal.findOne({
        where: {
            email: req.body.email,
        }, include: [models.Student, models.Tutor, models.Admin]
    }).then(function (user) {
        if (!user) {
            return res.send({
                success: "false",
                message: "invalid email"
            })
        }
        passutils.compare2hash(req.body.password, user.password).then(function (match) {
            if (match) {
                models.AuthToken.create({
                    token: uid(30),
                    role: user.role,
                    userlocalId: user.id
                }).then(function (authToken) {
                    if (user.student) {
                        return res.send({
                            success: 'true',
                            url: '/library',
                            name: user.student.name,
                            token: authToken.token
                        })
                    }
                    else if (user.tutor) {
                        return res.send({
                            success: 'true',
                            name: user.tutor.name,
                            url: '/library',
                            token: authToken.token
                        })
                    }
                    else if (user.admin) {
                        return res.send({
                            success: 'true',
                            url: '/admin/dashboard',
                            name: user.admin.name,
                            token: authToken.token
                        })
                    }
                    else {
                        return res.send({
                            success: 'false',
                        })
                    }


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
