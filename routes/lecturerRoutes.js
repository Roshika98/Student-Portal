const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Academic
 *  description: APIs for Academic user
 */


/**
 * @swagger
 * /student-portal/lecturer:
 *  get:
 *   tags: [Academic]
 *   security:
 *    -sessionAuth: []
 *   summary: Undergraduate Dashboard
 *   responses:
 *    200:
 *     description: dashboard returned 
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/user'
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