const ensureAuthenticated = require(_base + 'middleware/ensureAuthenticated'),
    populateLocals = require(_base + 'middleware/populateLocals');

let User = require(_base + 'models/user');

module.exports = {
    '/admin': {
        methods: ['get'],
        middleware: [ensureAuthenticated, populateLocals],
        fn: function(req, res, next) {
            // Authenticate
            if(req.user.permissions.userType === 'mod') {
                res.sendFile(_base + 'public/views/admin.html');
            } else {
                res.redirect('/login');
            }
        }
    }
}