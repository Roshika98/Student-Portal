const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: APIs for managing authentication
 */


/**
 * @swagger
 * /student-portal/auth:
 *  get:
 *   tags: [Authentication]
 *   summary: Returns the login page
 *   responses:
 *    200:
 *     description: Login page returned 
 *     content:
 *      text/html:
 *       schema:
 *        $ref: '#/components/schemas/page'
 */
router.get('/', (req, res) => {
    res.render('login', { layout: false });
});

/**
 * @swagger
 * /student-portal/auth:
 *  post:
 *   tags: [Authentication]
 *   summary: Used to login a user to the portal
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/userLogin'
 *   responses:
 *    200:
 *     description: login successful 
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginsuccess'
 *    401:
 *     description: Login failed- invalid credentials
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginFail'
 */
router.post('/', passport.authenticate('local', { failureRedirect: '/student-portal/auth/failure' }), (req, res) => {
    res.redirect('/student-portal/auth/success');
});



router.get('/success', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ message: 'login successful' });
    }
    else {
        res.status(401).json({ message: 'login failed - invalid credentials' });
    }
});

router.get('/failure', (req, res) => {
    res.status(401).json({ message: 'login failed - invalid credentials' });
});


module.exports = router;