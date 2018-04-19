const passport = require('passport');

module.exports = {
    '/create/session': {
        methods: ['post'],
        middleware: [passport.authenticate('login', {
            successRedirect: 'session/success',
            failureRedirect: 'session/fail',
            failureFlash: false
        })],
        fn: function(req, res, next) {
            
        }
    },
    '/create/session/success': {
        methods: ['get'],
        fn: function(req, res, next) {
            res.redirect('/');
        }
    },
    '/create/session/fail': {
        methods: ['get'],
        fn: function(req, res, next) {
            next(new Error('Incorrect credentials.'));
        }
    }
}