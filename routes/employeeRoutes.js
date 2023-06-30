const express = require('express');
const router = express.Router();
const academiccoordinatorRouter = require("./academicCoordinatorRoutes");
const assistantRegistrarRouter = require("./assistantRegistrarRoutes");
const academicCoordinatorController = require("../controllers/academicCoordinatorController");
const assistantRegistrarController = require("../controllers/assistantRegistrarController");

/**
 * @swagger
 * tags:
 *  name: Employee
 *  description: APIs for employee user
 */

router.use("/academic", academiccoordinatorRouter);
router.use("/registrar", assistantRegistrarRouter);

/**
 * @swagger
 * /student-portal/employee:
 *  get:
 *   tags: [Employee]
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
router.get("/", async (req, res) => {
	const user = req.user;
	res.status(200).json(user);
});

/**
 * @swagger
 * /student-portal/employee/create-resource/club:
 *  post:
 *   tags: [Employee]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new club resource
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
router.post("/create-resource/club", async (req, res) => {
	const { webmasterDat, clubDat } = req.body;
	try {
		await academicCoordinatorController.createNewClub(webmasterDat, clubDat);
		res.status(200).json({ message: "resource succesfully created" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

module.exports = router;