const mongoose = require('mongoose');
const {
	Undergraduate,
	Lecturer,
	Employee,
	Webmaster,
	Faculty,
	Degree,
	Department,
	CourseModule,
	Grade,
	Result,
	YearOfStudy,
	LecturerCourse,
	Club,
} = require("../models");
const { basicLogger } = require("../utils/logger/logger");

/**
 * The class which handles all the database processes within the application
 *
 * @class
 */
class Database {
	/**
	 * Creates an instance of the Database class
	 */
	constructor() {
		this.logger = basicLogger;
		this.mongoose = mongoose;
	}

	// * Region : Resource Accessors-------------------------------------------------------------

	async getDashboard() {}

	/**
	 * Returns details of the specified Faculty/s
	 *
	 * @param {string|object} data - The name of the faculty.
	 */
	async getFacultyDetails(name) {
		var faculty = null;
		try {
			faculty = await Faculty.findOne({ name: name });
			return faculty;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns details of the specified department/s
	 *
	 * @param {string|object} data - The name of the department or an object containing a collection of department names.
	 * @param {string[]} data.departments
	 * @returns {Promise<Department|Department[]>} Return a promise containing a Department or a collection of Departments
	 */
	async getDepartmentDetailsImp(data) {
		var dept = null;
		try {
			if (typeof data === "string") {
				dept = await Department.findOne({ name: data });
				return dept;
			} else if (typeof data === "object") {
				dept = await Department.find({ name: { $in: data.departments } });
				return dept;
			} else throw new Error("Argument exception");
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns details of the specified Lecturer/s
	 *
	 * @overload
	 * @param {string} data - The name of the Lecturer.
	 * @returns {Promise<Lecturer>} Return a promise containing a Lecturer
	 *
	 * @overload
	 * @param {object} data - data required for the search criteria of the Lecturer
	 * @param {mongoose.Schema.Types.ObjectId} data.department - the department the Lecturers belongs to.
	 * @returns {Promise<Lecturer[]>} Return a promise containing a Lecturer
	 *
	 * @overload
	 * @param {object} data - data containing the search criteria for Lecturer/s
	 * @param {string} data.name - Name of the Lecturer.
	 * @param {mongoose.Schema.Types.ObjectId} data.department - the respective department the lecturer belongs to.
	 * @return {Promise<Lecturer>} Return a promise With Lecturer.
	 *
	 * @overload
	 * @param {object} data - data containing the search criteria for Lecturer/s
	 * @param {string[]} data.name - Names of the Lecturers.
	 * @param {mongoose.Schema.Types.ObjectId} data.department - the respective department the lecturer belongs to.
	 * @return {Promise<Lecturer[]>} Return a promise With Lecturer.
	 */
	async getLecturerDetailsImp(data) {
		var lec = null;
		try {
			if (typeof data === "string") {
				lec = await Lecturer.findOne({ name: data });
				return lec;
			} else if (typeof data === "object" && Object.keys(data).length == 2) {
				if (typeof data.name === "string") {
					lec = await Lecturer.find({
						name: data.name,
						department: data.department,
					});
					return lec;
				} else if (Array.isArray(data.name)) {
					lec = await Lecturer.find({
						name: { $in: data.name },
						department: data.department,
					});
					return lec;
				}
			} else if (typeof data === "object" && Object.keys(data).length == 1) {
				lec = await Lecturer.find({ department: data.department });
				return lec;
			} else throw new Error("Argument exception");
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns details of the specified courseModule/s
	 *
	 * @overload
	 * @param {string} data - The name of the courseModule.
	 * @returns {Promise<CourseModule>} Return a promise containing a CourseModule.
	 *
	 * @overload
	 * @param {string[]} data - An array of names of courseModules.
	 * @returns {Promise<CourseModule[]>} Return a promise containing an array of CourseModules.
	 */
	async getCourseModuleDetailsImp(data) {
		var courseModule = null;
		try {
			if (typeof data === "string") {
				courseModule = await CourseModule.findOne({ name: data });
				return courseModule;
			} else if (Array.isArray(data)) {
				courseModule = await CourseModule.find({ name: { $in: data } });
				return courseModule;
			} else if (typeof data === "object") {
				// todo implement how to handle when an object is passed
			} else throw new Error("Argument Exception");
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns details of the specified Degree/s
	 *
	 * @overload
	 * @param {string} data - The name of the Degree.
	 * @returns {Promise<Degree>} Return a promise containing a Degree.
	 *
	 * @overload
	 * @param {string[]} data - An array of names of Degrees.
	 * @returns {Promise<Degree[]>} Return a promise containing an array of Degrees.
	 */
	async getDegreeDetailsImp(data) {
		var degree = null;
		try {
			if (typeof data === "string") {
				degree = await Degree.findOne({ name: data });
				return degree;
			} else if (Array.isArray(data)) {
				degree = await Degree.find({ name: { $in: data } });
				return degree;
			} else if (typeof data === "object") {
				// todo implement how to handle when an object is passed
			} else throw new Error("Argument Exception");
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns details of the specified Undergraduate/s
	 *
	 * @overload
	 * @param {string} data - The studentID of the undergraduate.
	 * @returns {Promise<Undergraduate>} Return a promise containing a Degree.
	 *
	 * @overload
	 * @param {string[]} data - An array of studentId's of undergraduates.
	 * @returns {Promise<Undergraduate[]>} Return a promise containing an array of Degrees.
	 */
	async getUndergraduateDetailsImp(data) {
		var undergraduate = null;
		try {
			if (typeof data === "string") {
				undergraduate = await Undergraduate.findOne({ studentId: data });
				return undergraduate;
			} else if (Array.isArray(data)) {
				undergraduate = await Undergraduate.find({ studentId: { $in: data } });
				return undergraduate;
			} else if (typeof data === "object") {
				// todo implement how to handle when an object is passed
			} else throw new Error("Argument Exception");
		} catch (error) {
			throw error;
		}
	}

	// * Region: Resource Creation----------------------------------------------------------------

	/**
	 * Creates a new Grade Resource
	 *
	 * @param {object} data - The grade data.
	 * @param {String} data.grade - grade value.
	 * @param {number} data.gpa - the contribution to the GPA
	 */
	async createNewGradeImp(data) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const grade = await Grade.create(data);
			grade.save(session);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		}
	}

	// todo implement this on registarcontroller class
	/**
	 * Creates a new Faculty Resource
	 *
	 * @param {object} data - The faculty data.
	 */
	async createNewFacultyImp(data) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const result = await Faculty.create(data);
			result.save(session);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		}
	}

	/**
	 * Creates a new Non-Academic Employee Resource
	 *
	 * @param {object} data - The non-academic employee data.
	 * @param {string} data.name - Name of the employee
	 * @param {string} data.employeeId - Id of the employee
	 * @param {string} data.email - email address of the employee
	 * @param {Date} data.dateOfBirth - date of birth of the employee
	 * @param {string} data.position - position of the employee
	 * @param {mongoose.Schema.Types.ObjectId} data.faculty - the faculty which the employee belongs to
	 */
	async createNewEmployeeImp(data) {
		const genPassword = "";
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			var newEmployee = await Employee.register(data, genPassword, {
				session,
			});
			await session.commitTransaction();
			await session.endSession();
			return newEmployee;
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		}
	}
}

module.exports = Database;