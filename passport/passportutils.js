function ensureLogin() {

    return function (req, res, next) {

        if (!req.user) {
            res.send({success: 'false', url: '/'});
        } else {
            next();
        }
    }
}


function ensureTutor() {
    return function (req, res, next) {

        if (req.user && req.user.role === 'Tutor') {
            next();
        } else {
            res.send({success: 'false', url: '/', message: "Tutor Only"});
        }
    }
}

function ensureAdmin() {
    return function (req, res, next) {

        if (req.user && req.user.role === 'Admin') {
            next();
        } else {
            res.send({success: 'false', url: '/', message: "Admin Only"});
        }
    }
}

module.exports = {
    ensureLogin,
    ensureTutor,
    ensureAdmin
}