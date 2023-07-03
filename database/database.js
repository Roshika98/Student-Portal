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
	 * Creates an instance the Database class
	 */
	constructor() {
		basicLogger.info("database controller initiated");
	}

	// * Region : Resource Accessors-------------------------------------------------------------

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

	/**
	 * Creates a new Course Module Resource
	 *
	 * @param {object} data - The coursemodule data.
	 * @param {string} data.name - the name of the coursemodule.
	 * @param {string} data.courseCode - the code of the coursemodule.
	 * @param {number} data.yearOfStudy - the year of study this coursmodule belongs to.
	 * @param {number} data.credits - the number of credits of the coursmodule.
	 * @param {string} data.description - description of the coursemodule.
	 * @param {mongoose.Schema.Types.ObjectId} data.department - The Department this coursemodule belongs to
	 */
	async createCourseModuleImp(data) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const result = await CourseModule.create(data);
			await result.save(session);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		} 
	}

	//   TODO implement this on assistantRegistrar controller class
	/**
	 * Creates a new Result Resource
	 * @param {object} data - The Result data.
	 * @param {mongoose.Schema.Types.ObjectId} data.undergraduate - The undergrduate associated with the Result.
	 * @param {mongoose.Schema.Types.ObjectId} data.courseModule - The courseModule associated with the Result.
	 */
	async createNewResultImp(data) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const result = await Result.create(data);
			result.save(session);
			await session.commitTransaction();
			await session.endawait();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		} 
	}

	/**
	 * Creates a new Club Resource
	 *
	 * @param {object} data - The Club data.
	 * @param {string} data.name - The name of the Club.
	 * @param {string} data.description - The description associated with the Club.
	 * @param {string} data.webmaster - The id of the webmaster associated with the club.
	 */
	async createNewClubImp(data) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const webmaster = await Webmaster.findById(data.webmaster).session(
				session
			);
			const club = await Club.create({
				...data,
				webmaster: webmaster,
			});
			club.save(session);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		} 
	}

	/**
	 * Creates a new Degree Resource
	 *
	 * @param {object} data - The default degree data.
	 * @param {mongoose.Schema.Types.ObjectId[]} departments - The departments associated with the degree.
	 * @param {object} user - The user associated with creating the degree resource.
	 */
	async createNewDegreeImp(data, departments, user) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const emp = await Employee.findById({ _id: user._id }).session(session);
			const faculty = await Faculty.findById({ _id: emp.faculty }).session(
				session
			);
			const degree = await Degree.create({
				...data,
				faculty: faculty,
				departments: departments,
			});
			degree.save(session);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		} 
	}

	/**
	 * Creates a new YearOfStudy Resource
	 *
	 * @param {object} data - The Result data.
	 * @param {number} data.year - The respective year associated with the resource.
	 * @param {mongoose.Schema.Types.ObjectId} data.degree - The degree associated with the yearOfStudy.
	 * @param {Array<mongoose.Schema.Types.ObjectId>} data.mandotaryCourseModules - The mandatory courseModules associated with the yearOfStudy.
	 * @param {Array<mongoose.Schema.Types.ObjectId>} data.optionalCourseModules - The optional courseModules associated with the yearOfStudy.
	 */
	async createNewYearOfStudyImp(data) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const yearOfStudy = await YearOfStudy.create(data);
			yearOfStudy.save(session);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		} 
	}

	//  todo implement this on academiccoordinator class
	/**
	 * Creates a new Lecturer & coursemodule association
	 *
	 * @param {object} data - The respective data.
	 * @param {string} data.lecturer - The lecturer associated with the association.
	 * @param {string} data.courseModule - The courseModule associated with the association.
	 */
	async createNewLecturerCourseAssociationImp(data) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const lecturer = await Lecturer.findById(data.lecturer).session(session);
			const courseModule = await CourseModule.findById(
				data.courseModule
			).session(session);
			const association = await LecturerCourse.create({
				lecturer,
				courseModule,
			});
			association.save(session);
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
	 * Creates a new Department Resource
	 *
	 * @param {object} data - The department data.
	 * @param {string} data.name - the name of the department.
	 * @param {object} user - The user associated with creating the resource
	 */
	async createNewDeptImp(data, user) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const emp = await Employee.findById({ _id: user._id }).session(session);
			const department = await Department.create({
				...data,
				faculty: emp.faculty,
			});
			await department.save(session);
			const updateFaculty = await Faculty.findByIdAndUpdate(
				{ _id: emp.faculty },
				{ $push: { departments: department } }
			).session(session);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			session.abortTransaction();
			session.endSession();
			throw error;
		} 
	}

	/**
	 * Creates a new Lecturer Resource
	 *
	 * @param {object} data - The Lecturer data.
	 * @param {string} data.name - Name of the Lecturer
	 * @param {string} data.employeeId - Id of the Lecturer
	 * @param {string} data.email - email address of the Lecturer
	 * @param {Date} data.dateOfBirth - date of birth of the Lecturer
	 * @param {string} data.position - position of the Lecturer
	 * @param {string} data.department - the department which the Lecturer belongs to.
	 * @param {object} user - The non-academic user associated with creating the resource.
	 */
	async createNewLecturerImp(data, user) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const emp = await Employee.findById({
				_id: user._id,
			}).session(session);
			const faculty = await Faculty.findOne({ _id: emp.faculty }).session(
				session
			);
			const department = await Department.findOne({
				name: data.deptName,
			}).session(session);
			const lecturer = await Lecturer.register(
				{
					name: data.name,
					employeeId: data.lecId,
					faculty: faculty,
					department: department,
					email: data.email,
					dateOfBirth: new Date(data.dob),
					position: data.position,
				},
				data.password,
				{ session }
			);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		} finally {
			session.endSession();
		}
	}

	/**
	 * Creates a new Undergraduate Resource
	 *
	 * @param {object} data - The undergraduate data.
	 * @param {string} data.name - the name of the undergraduate.
	 * @param {string} data.studentId - the student id of the undergraduate.
	 * @param {string} data.email - the email address of the undergraduate.
	 * @param {Date} data.enrolledDate - the date the undergraduate enrolled in the university.
	 * @param {Date} data.dateOfBirth - the date of birth of the undergraduate.
	 * @param {string} data.batch - the respective batch the undergraduate belongs to.
	 * @param {object} user - The user associated with creating the resource.
	 */
	async createNewUndergraduateImp(data, employee) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const emp = await Employee.findById({
				_id: employee._id,
			}).session(session);
			const faculty = await Faculty.findOne({ _id: emp.faculty }).session(
				session
			);
			var newUndergrad = await Undergraduate.register(
				{
					name: data.name,
					studentId: data.studentId,
					email: data.email,
					enrolledDate: data.enrolledDate,
					dateOfBirth: data.dateOfBirth,
					batch: parseInt(data.batch),
					faculty: faculty,
				},
				data.password,
				{ session }
			);
			await session.commitTransaction();
			await session.endSession();
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		}
	}

	/**
	 * Creates a new Webmaster Resource
	 *
	 * @param {object} data - The Webmaster data.
	 * @param {string} data.username - The username of the webmaster
	 * @param {string} data.email - email address of the webmaster
	 * @param {string} data.firstName - first name of the webmaster
	 * @param {string} data.lastName - last name of the webmaster
	 * @returns {string} Id of the created webmaster
	 */
	async createNewWebmasterImp(data) {
		const genPassword = "";
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			var newWebmaster = await Webmaster.register(data, genPassword, {
				session,
			});
			session.commitTransaction();
			session.endSession();
			return newWebmaster.id !== null ? newWebmaster.id : null;
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

module.exports = new Database();