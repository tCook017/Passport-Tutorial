const bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    routescan = require('express-routescan'),
    session = require('express-session');

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

global._base = __dirname + '/';

// Relevant code
app.use(cookieParser()); // Use cookie parser middleware
app.use(session({ 
    secret: "eo2rt3`2,13fgbj.n6soer,.gjb3>, 2osee3n-b1vhn", // String used to encrypt cookies before sending to clients, prevents client from tampering
    resave: true, // Updates session if it is changed
    saveUninitialized: true, // Resets sessions that aren't initialized
    cookie: {
        secure: false, // true requires an https-enabled website
        maxAge: Number(1000000000) // Cookie life in ms
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/passport-tutorial');
let setUpPassport = require('./services/SetUpPassport');
setUpPassport();
//

routescan(app, {
    ignoreInvalid: true
});
app.use('/', express.static('./'));
app.use('/js', express.static('./public/js'));

app.listen(3000);
