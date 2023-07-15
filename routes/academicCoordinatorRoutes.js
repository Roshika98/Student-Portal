const express = require("express");
const wrapper = require("./asyncWrappers/academicWrapper");
const catchAsync = require("../utils/error/catchAsync");
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
router.post("/create-resource/lecturer", catchAsync(wrapper.createLecturer));

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
router.post("/create-resource/degree", catchAsync(wrapper.createDegree));

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
router.post(
	"/create-resource/department",
	catchAsync(wrapper.createDepartment)
);

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
router.post(
	"/create-resource/course-module",
	catchAsync(wrapper.createCourseModule)
);

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
router.post(
	"/create-resource/yearofstudy",
	catchAsync(wrapper.createYearOfStudy)
);

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
router.post(
	"/create-resource/lecturerAssociation",
	catchAsync(wrapper.createLecturerModuleAssociation)
);

module.exports = router;
