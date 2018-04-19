const bcrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose'),
    shortid = require('shortid');

const SALT_FACTOR = 4;

let userSchema = new mongoose.Schema({
    _id: { type: String, required: true, default: shortid.generate },
    name: { type: String, required: true },
    password: { type: String, required: true },
    permissions: { type: JSON, required: true } 
}, { collection: 'users' });

function noop() {};

userSchema.pre('save', function(done) {
    let user = this;
    
    if (!user.isModified('password')) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
        return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
    console.log('Saving user named ' + user.name);
});

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

let User = mongoose.model('User', userSchema);
module.exports = User;