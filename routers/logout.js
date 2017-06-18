const router = require('express').Router();

router.get('/', function (req, res) {
    req.user = null;
    req.logout();
    req.session.destroy(function (err) {
        res.send({url: 'http://ec2-35-154-176-212.ap-south-1.compute.amazonaws.com:4000/'});
    });
});

router.get('/bearer/student', function (req, res) {
    if (req.headers.Authorization) {
        let token = req.headers.Authorization.split(' ')[1];
        models.AuthStudent.destroy({
            where: {
                token: token
            }
        }).then(function () {
            res.send({url: 'http://ec2-35-154-176-212.ap-south-1.compute.amazonaws.com:4000/'});
        }).catch(function (err) {
            console.log(err);
            res.send("Could not logout");
        })
    }
});

module.exports = router;