function ensureLogin(fallbackPath) {

    return function (req, res, next) {

        if (!req.user) {
            res.redirect(fallbackPath);
        } else {
            next();
        }
    }
}


function ensureTutor(fallbackPath) {

    return function (req, res, next) {

        if (req.user && req.user.role === 'Tutor') {
            next()
        } else {
            res.redirect(fallbackPath)
        }
    }
}

function ensureAdmin(fallbackPath) {
    return function (req, res, next) {

        if (req.user && req.user.role === 'Admin') {
            next();
        } else {
            res.redirect(fallbackPath)
        }
    }
}


module.exports = {
    ensureLogin,
    ensureAdmin,
    ensureTutor
};