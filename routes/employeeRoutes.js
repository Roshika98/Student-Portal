const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Non-Academic
 *  description: APIs for non-academic user
 */


/**
 * @swagger
 * /student-portal/employee:
 *  get:
 *   tags: [Non-Academic]
 *   security:
 *    -sessionAuth: []
 *   summary: employee Dashboard
 *   responses:
 *    200:
 *     description: dashboard returned 
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginFail'
 *    403:
 *     description: Forbidden
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/unauthorized'   
 */
router.get('/', async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
});


module.exports = router;