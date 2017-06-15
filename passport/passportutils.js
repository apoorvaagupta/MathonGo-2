function ensureStudent(fallbackPath) {

    return function (req, res, next) {

        if (req.user && req.user.role === 'Student') {
            next()
        } else {
            res.redirect(fallbackPath)
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
    ensureStudent,
    ensureAdmin,
    ensureTutor
};