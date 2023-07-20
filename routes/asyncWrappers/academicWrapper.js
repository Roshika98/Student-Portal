const academicCoordinatorController = require("../../controllers/academicCoordinatorController");

const createLecturer = async (req, res) => {
	const data = req.body;
	var result = await academicCoordinatorController.createNewLecturer(
		data,
		req.user
	);
	res.status(200).json({ message: "resource succesfully created" });
};

const createDegree = async (req, res) => {
	const data = req.body;
	await academicCoordinatorController.createNewDegree(data, req.user);
	res.status(200).json({ message: "resource successfully created" });
};

const createDepartment = async (req, res) => {
	const data = req.body;
	await academicCoordinatorController.createNewDepartment(data, req.user);
	res.status(200).json({ message: "resource successfully created" });
};

const createCourseModule = async (req, res) => {
	const data = req.body;
	await academicCoordinatorController.createNewCourseModules(data);
	res.status(200).json({ message: "resource succesfully created" });
};

const createYearOfStudy = async (req, res) => {
	const data = req.body;
	await academicCoordinatorController.createNewYearOfStudy(data);
	res.status(200).json({ message: "resource succesfully created" });
};

const createLecturerModuleAssociation = async (req, res) => {
	const data = req.body;
	await academicCoordinatorController.createNewLecturerCourseAssociation(data);
	res.status(200).json({ message: "resource successfully created" });
};

module.exports = {
	createLecturer,
	createDegree,
	createDepartment,
	createCourseModule,
	createYearOfStudy,
	createLecturerModuleAssociation,
};
