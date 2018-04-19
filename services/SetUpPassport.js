const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

let User = require(_base + 'models/user'); // Any model can be used, just be consistent in the methods below.

module.exports = function () {
    passport.serializeUser(function (user, done) { // This method will convert the 'user' object into a cookie. 'passport.deserializeUser()' does the opposite.
        console.log('Serializing user ' + user.name);
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) { // The first parameter of the passed in function should be the 'id,' sense you use 'model.findById()'
        console.log('Deserializing user of id' + id);
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
/* 
The first parameter of 'passport.use()' is what the name of your strategy will be. This means you can have multiple strategies for different situations.
The first parameter of 'LocalStrategy()' configures passport-local strategy options. There are two renameable fields: 'usernameField' and 'passwordField'
*/
passport.use('login', new LocalStrategy({ usernameField: 'name' }, function (name, password, done) {
    User.findOne({ name: name }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Invalid name' });
        }
        user.checkPassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password.' });
            }
        });
    });
}));
