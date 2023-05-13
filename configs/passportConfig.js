const passport = require('passport');
const strategy = require('../utils/security/strategy');

passport.use(strategy.localStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        if (user !== null) {
            done(null, user);
        } else {
            Employee.findById(id).then(employee => {
                done(null, employee);
            })
        }
    });
});

module.exports = passport;