const router = require('express').Router();

router.get('/', function (req, res){
    req.user = null;
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

module.exports = router;