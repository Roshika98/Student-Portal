const express = require("express");
const assistantRegistrarController = require("../controllers/assistantRegistrarController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Assistant Registrar
 *  description: APIs for assistant registrar user
 */

/**
 * @swagger
 * /student-portal/employee/registrar/create-resource/undergraduate:
 *  post:
 *   tags: [Assistant Registrar]
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
router.post("/create-resource/undergraduate", async (req, res) => {
	const data = req.body;
	try {
		var result = await assistantRegistrarController.createAnUndergraduate(
			data,
			req.user
		);
		res.status(200).json({ message: "resource succesfully created" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

/**
 * @swagger
 * /student-portal/employee/registrar/create-resource/undergradResult:
 *  post:
 *   tags: [Assistant Registrar]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new undergraduate Result resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UGResult'
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
router.post("/create-resource/undergradResult", async (req, res) => {
	const data = req.body;
	try {
		await assistantRegistrarController.createNewResult(data);
		res.status(200).json({ message: "resource created successfully" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

module.exports = router;
