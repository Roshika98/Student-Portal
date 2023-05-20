const express = require('express');
const router = express.Router();
// const database = require('../database/database');
const controller = require('../controllers/employeeController');

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

/**
 * @swagger
 * /student-portal/employee/create-resource/lecturer:
 *  post:
 *   tags: [Non-Academic]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new Lecturer resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/lecturer'
 *   responses:
 *    200:
 *     description: Resource created 
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/resource'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/servererror'
 *    403:
 *     description: Forbidden
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/unauthorized'   
 */
router.post('/create-resource/lecturer', async (req, res) => {
    const data = req.body;
    try {
        var result = await controller.createNewLecturer(data, req.user);
    } catch (error) {
        res.status(500).json({ message: error });
    } finally {
        res.status(200).json({ message: 'resource succesfully created' });
    }

});

/**
 * @swagger
 * /student-portal/employee/create-resource/undergraduate:
 *  post:
 *   tags: [Non-Academic]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new undergraduate resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/undergrad'
 *   responses:
 *    200:
 *     description: Resource created 
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/resource'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/servererror'
 *    403:
 *     description: Forbidden
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/unauthorized'   
 */
router.post('/create-resource/undergraduate', async (req, res) => {
    const data = req.body;
    try {
        var result = await controller.createAnUndergraduate(data, req.user);
        res.status(200).json({ message: 'resource succesfully created' })
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router;