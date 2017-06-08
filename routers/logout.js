const router = require('express').Router();

router.get('/', function (req, res){
    req.user = null;
    req.logout();
    req.session.destroy(function (err) {
        res.send('http://localhost:4000');
    });
});

module.exports = router;