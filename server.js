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
     , apirouter = require('./routers/api');

app.use(express.static(path.join(__dirname, 'public_html')));
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

app.use('/api', apirouter);
//app.use('/library/:id',express.static(path.join(__dirname,'public_html/minicourse')));
app.use('/library', express.static(path.join(__dirname, 'public_html/library')));
app.use('/lesson', express.static(path.join(__dirname, 'public_html/lesson')));
app.use('/student', express.static(path.join(__dirname, 'public_html/student')));

app.listen(4000, function () {
    console.log("Listening on 4000");
});