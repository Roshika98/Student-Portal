const express = require("express");
const academicCoordinatorController = require("../controllers/academicCoordinatorController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Academic Co-ordinator
 *  description: APIs for academic coordinator user
 */

/**
 * @swagger
 * /student-portal/employee/academic/create-resource/lecturer:
 *  post:
 *   tags: [Academic Co-ordinator]
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
router.post("/create-resource/lecturer", async (req, res) => {
	const data = req.body;
	try {
		var result = await academicCoordinatorController.createNewLecturer(
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
 * /student-portal/employee/academic/create-resource/degree:
 *  post:
 *   tags: [Academic Co-ordinator]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new Degree resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/degree'
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
router.post("/create-resource/degree", async (req, res) => {
	const data = req.body;
	try {
		await academicCoordinatorController.createNewDegree(data, req.user);
		res.status(200).json({ message: "resource successfully created" });
	} catch (error) {
		res.status(500).json(error);
	}
});

/**
 * @swagger
 * /student-portal/employee/academic/create-resource/department:
 *  post:
 *   tags: [Academic Co-ordinator]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new Department resource
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
router.post("/create-resource/department", async (req, res) => {
	const data = req.body;
	try {
		await academicCoordinatorController.createNewDepartment(data, req.user);
	} catch (error) {}
});

/**
 * @swagger
 * /student-portal/employee/academic/create-resource/course-module:
 *  post:
 *   tags: [Academic Co-ordinator]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new course module resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/course-module'
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
router.post("/create-resource/course-module", async (req, res) => {
	const data = req.body;
	try {
		await academicCoordinatorController.createNewCourseModules(data);
		res.status(200).json({ message: "resource succesfully created" });
	} catch (error) {
		res.status(500).json(error);
	}
});

/**
 * @swagger
 * /student-portal/employee/academic/create-resource/yearofstudy:
 *  post:
 *   tags: [Academic Co-ordinator]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new course module resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/yearOfStudy'
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
router.post("/create-resource/yearofstudy", async (req, res) => {
	const data = req.body;
	try {
		await academicCoordinatorController.createNewYearOfStudy(data);
		res.status(200).json({ message: "resource succesfully created" });
	} catch (error) {
		res.status(500).json(error);
	}
});

/**
 * @swagger
 * /student-portal/employee/academic/create-resource/lecturerAssociation:
 *  post:
 *   tags: [Academic Co-ordinator]
 *   security:
 *    -sessionAuth: []
 *   summary: creates a new Lecturer & course module association resource
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/lecturerAssoc'
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
router.post("/create-resource/lecturerAssociation", async (req, res) => {
	const data = req.body;
	try {
		await academicCoordinatorController.createNewLecturerCourseAssociation(
			data
		);
		res.status(200).json({ message: "resource successfully created" });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
