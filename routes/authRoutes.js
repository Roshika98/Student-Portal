const express = require('express');
const router = express.Router();
const passport = require('passport');



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
 * /student-portal/auth/logout:
 *  get:
 *   tags: [Authentication]
 *   summary: Used to log out from the portal
 *   responses:
 *    200:
 *     description: Login page returned 
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginFail'
 */
router.get('/logout', (req, res) => {
    req.logout((err) => {
        req.session.destroy();
        res.status(200).json({ message: 'logged out user' });
    });
});


/**
 * @swagger
 * /student-portal/auth/undergraduate:
 *  post:
 *   tags: [Authentication]
 *   summary: Used to login an undergraduate to the portal
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
router.post('/undergraduate', passport.authenticate('undergraduate', { failureRedirect: '/student-portal/auth/failure' }), (req, res) => {
    res.redirect('/student-portal/auth/success');
});

/**
 * @swagger
 * /student-portal/auth/lecturer:
 *  post:
 *   tags: [Authentication]
 *   summary: Used to login a lecturer to the portal
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
router.post('/lecturer', passport.authenticate('lecturer', { failureRedirect: '/student-portal/auth/failure' }), (req, res) => {
    res.redirect('/student-portal/auth/success');
});


/**
 * @swagger
 * /student-portal/auth/employee:
 *  post:
 *   tags: [Authentication]
 *   summary: Used to login an employee to the portal
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
router.post('/employee', passport.authenticate('employee', { failureRedirect: '/student-portal/auth/failure' }), (req, res) => {
    res.redirect('/student-portal/auth/success');
});


/**
 * @swagger
 * /student-portal/auth/webmaster:
 *  post:
 *   tags: [Authentication]
 *   summary: Used to login a webmaster to the portal
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
router.post('/webmaster', passport.authenticate('webmaster', { failureRedirect: '/student-portal/auth/failure' }), (req, res) => {
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