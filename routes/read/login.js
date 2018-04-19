module.exports = {
    '/login': {
        methods: ['get'],
        fn: function(req, res, next) {
            res.sendFile(_base + 'public/views/login.html');
        }
    }
}