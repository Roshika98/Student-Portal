const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Undergraduate
 *  description: APIs for Undergraduate user
 */


/**
 * @swagger
 * /student-portal/undergraduate:
 *  get:
 *   tags: [Undergraduate]
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