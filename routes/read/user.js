const ensureAuthenticated = require(_base + 'middleware/ensureAuthenticated'),
    populateLocals = require(_base + 'middleware/populateLocals'); 

let User = require(_base + 'models/user');

module.exports = {
    '/user/:name': {
        methods: ['get'],
        middleware: [ensureAuthenticated, populateLocals],
        fn: function(req, res, next) {
            let name = req.params.name;
            if(req.user.permissions.userType === 'mod' || req.user.name === name) {
                res.sendFile(_base + 'public/views/user.html');
            } else if(!req.user) {
                res.redirect('/login');
            } else {
                res.redirect('/');
            }
        }
    }
}