const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAuthenticated } = require("../middleware/authMiddleware");
const { basicLogger } = require("../utils/logger/logger");

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: APIs for managing authentication
 */

/**
 * @swagger
 * /student-portal/auth/logout:
 *  post:
 *   tags: [Authentication]
 *   summary: Used to log out from the portal
 *   responses:
 *    200:
 *     description: User logged out
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginFail'
 */
router.post("/logout", (req, res) => {
	req.logout((err) => {
		req.session.destroy();
		res.status(200).json({ message: "logged out user" });
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
 *    409:
 *     description: Conflict login
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginFail'
 */
router.post(
	"/undergraduate",
	isAuthenticated,
	passport.authenticate("undergraduate", {
		failureRedirect: "/student-portal/auth/failure",
	}),
	(req, res) => {
		res.redirect("/student-portal/auth/success");
	}
);

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
 *    409:
 *     description: Conflict login
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginFail'
 */
router.post(
	"/lecturer",
	isAuthenticated,
	passport.authenticate("lecturer", {
		failureRedirect: "/student-portal/auth/failure",
	}),
	(req, res) => {
		res.redirect("/student-portal/auth/success");
	}
);

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
 *    409:
 *     description: Conflict login
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginFail'
 */
router.post(
	"/employee",
	isAuthenticated,
	passport.authenticate("employee", {
		failureRedirect: "/student-portal/auth/failure",
	}),
	(req, res) => {
		res.redirect("/student-portal/auth/success");
	}
);

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
 *    409:
 *     description: Conflict login
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/loginFail'
 */
router.post(
	"/webmaster",
	isAuthenticated,
	passport.authenticate("webmaster", {
		failureRedirect: "/student-portal/auth/failure",
	}),
	(req, res) => {
		res.redirect("/student-portal/auth/success");
	}
);

router.get("/success", (req, res) => {
	basicLogger.info("success achieved");
	if (req.isAuthenticated()) {
		var { _id, type } = req.user;
		console.log(res.locals);
		req.flash("success", "logged in successfully");
		// res.status(200).json({ _id, type });
		res.redirect("/");
	} else {
		res.status(401).json({ message: "login failed - invalid credentials" });
	}
});

router.get("/failure", (req, res) => {
	// req.flash("error", "Login failed - Invalid credentials");
	res.redirect("/");
	// res.status(401).json({ message: "login failed - invalid credentials" });
});

module.exports = router;
