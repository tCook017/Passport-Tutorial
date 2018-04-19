const passport = require("passport");

module.exports = {
    '/end-session': {
        methods: ['get'],
        fn: function(req, res, next) { // Ends session
            let name = req.user.name;
            console.log('Logging out ' + name);
            req.logout();
            req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                }
                res.json({ message: 'Success' });
            });
        }
    }
}