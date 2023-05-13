const LocalStrategy = require('passport-local');
const User = require('../../models/user');
const { basicLogger } = require('../logger/logger');


const localStrategy = new LocalStrategy({
    usernameField: 'username',
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({ regNo: username }, function (err, user) {
        if (err) {
            basicLogger.error(err);
            return done(err);
        }
        if (!user) {
            // TODO- Instead of passing an object with message use req.flash('failure','message');
            basicLogger.warn('Unknown user ' + username);
            return done(null, false, { message: 'Unknown user ' + username });
        }
        user.authenticate(password, function (err, users, passwordError) {
            if (passwordError) {
                basicLogger.warn('password is wrong');
                return done(null, false, { message: "password is wrong" })
            } else if (users) {
                basicLogger.info('successfully logged in ' + username);
                return done(null, users);
            }
        });
    });
});

// const employeeStrategy = new LocalStrategy(
//     function (username, password, done) {
//         Employee.findOne({ username: username }, function (err, user) {
//             if (err) return done(err);
//             if (!user) {
//                 // TODO- Instead of passing an object with message use req.flash('failure','message');
//                 return done(null, false, { message: 'Unknown user ' + username });
//             }
//             user.authenticate(password, function (err, users, passwordError) {
//                 if (passwordError) {
//                     return done(null, false, { message: "password is wrong" })
//                 } else if (users) {
//                     return done(null, users);
//                 }
//             });
//         });
//     }
// );

module.exports = { localStrategy };