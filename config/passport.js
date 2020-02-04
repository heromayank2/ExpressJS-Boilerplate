const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Nari = mongoose.model('Nari');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    Nari.findOne({ email })
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'Email or Password': 'is invalid' } });
            }
            return done(null, user);
        }).catch(done);
}));