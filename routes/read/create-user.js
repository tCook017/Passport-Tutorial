module.exports = {
    '/create-user': {
        methods: ['get'],
        fn: function(req, res, next) {
            res.sendFile(_base + 'public/views/create-user.html');
        }
    }
}