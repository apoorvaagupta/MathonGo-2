const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('./passport/passporthandler')
    , path = require('path')
    , cookieParser = require('cookie-parser');

const app = express();

const secrets = require('./secrets.json')
    , loginrouter = require('./routers/login')
    , logoutrouter = require('./routers/logout')
    , signuprouter = require('./routers/signup')
    , authorizerouter = require('./routers/authorize')
    , apirouter = require('./routers/api');

const ensure = require('./passport/passportutils');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static(path.join(__dirname, 'public_html')));
app.use(cookieParser(secrets.EXPRESS_SESSIONS_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: secrets.EXPRESS_SESSIONS_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/signup', signuprouter);
app.use('/login', loginrouter);
app.use('/logout', logoutrouter);
app.use('/authorize', authorizerouter);

//TODO passport.authenticate(['session', 'bearer-student'])
app.use('/api', ensure.ensureLogin(), apirouter);
app.use('/courses/:id', ensure.ensureLogin(), express.static(path.join(__dirname, 'public_html/minicourse')));
app.use('/library', ensure.ensureLogin(), express.static(path.join(__dirname, 'public_html/allMiniCourses')));
app.use('/lessons/:id', ensure.ensureLogin(), express.static(path.join(__dirname, 'public_html/lesson')));
app.use('/student/mycourses', ensure.ensureLogin(), express.static(path.join(__dirname, 'public_html/students/mycourses')));
app.use('/student/mybookmarks', ensure.ensureLogin(), express.static(path.join(__dirname, 'public_html/students/mybookmarks')));

app.listen(4000, function () {
    console.log("Listening on 4000");
});