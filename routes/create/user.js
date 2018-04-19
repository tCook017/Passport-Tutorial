let User = require(_base + 'models/user');

module.exports = {
    '/create/user': {
        methods: ['post'],
        fn: function(req, res, next) {
            let name = req.body.name,
                password = req.body.password,
                permissions = req.body.permissions;
            User.findOne({ name: name }, function(err, result) {
                if(err) {
                    return next(err);
                }
                if(result) {
                    return next(new Error('User already exists'));
                }

                console.log('Creating user named ' + name + ' with an access level of ' + permissions.userType);
                let user = new User({
                    name: name,
                    password: password,
                    permissions: permissions
                });
                user.save(function(err) {
                    if(err) {
                        return next(err);
                    }
                    res.json({ result: { name: name } });
                });
            });
        }
    }
}