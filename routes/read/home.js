module.exports = {
    '/': {
        methods: ['get'],
        fn: function(req, res, next) {
            res.sendFile(_base + 'public/views/home.html');
        }
    }
}