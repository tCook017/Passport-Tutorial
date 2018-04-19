const flash = require('connect-flash'),
    passport = require('passport');

module.exports = function(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash('info', 'Login to an account with the proper permissions to view this page.');
        res.redirect('/login');
    }
}