const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


router.get('/', (req, res) => {
    res.render('login', { layout: false });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/student-portal/auth' }), (req, res) => {
    res.redirect('/student-portal/auth/success');
});

router.get('/success', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome basic login ' + req.user.regNo);
    }
    else res.redirect('/student-portal/auth');
});


module.exports = router;