const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('./passport/passporthandler')
    , path = require('path')
    , cookieParser = require('cookie-parser');

const app = express();

const secrets = require('./secrets.json')
    , config = require('./config')
    , loginrouter = require('./routers/login')
    , connectrouter = require('./routers/connect')
    , logoutrouter = require('./routers/logoutrouter')
    , signuprouter = require('./routers/signup')
    , apirouter = require('./routers/api')
    , oauthrouter = require('./routers/oauthrouter')
    , pagerouter = require('./routers/pagerouter');


app.use(express.static(path.join(__dirname, 'public_html')));
app.use(cookieParser(secrets.EXPRESS_SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: secrets.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'oneauth'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(redirectToHome);
app.use('/login', loginrouter);
app.use('/connect', connectrouter);
app.use('/logout', logoutrouter);
app.use('/signup', signuprouter);
app.use('/api', apirouter);
app.use('/oauth', oauthrouter);
app.use('/', pagerouter);


app.listen(4000, function () {
    console.log("Listening on 4000");
});





