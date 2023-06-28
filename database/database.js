const mongoose = require('mongoose');
const {
	Undergraduate,
	Lecturer,
	NonAcademicEmployee,
	Webmaster,
	Faculty,
	Degree,
	Department,
	CourseModule,
	Grade,
	Result,
	YearOfStudy,
	LecturerCourse,
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
		} catch (error) {
			basicLogger.error(error);
			session.abortTransaction();
		} finally {
			session.endSession();
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
	 * @param {object} user - The lecturer associated with creating the resource.
	 */
	async createCourseModuleImp(data, lecturer) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const dept = await Department.findOne({
				_id: lecturer.department,
			}).session(session);
			data.department = dept;
			const result = await CourseModule.create(data);
			await result.save(session);
			await session.commitTransaction();
		} catch (error) {
			basicLogger.error(error);
			await session.abortTransaction();
		} finally {
			session.endSession();
		}
	}

	/**
	 * Creates a new Result Resource
	 *
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
		} catch (error) {
			basicLogger.error(error);
			session.abortTransaction();
		} finally {
			session.endSession();
		}
	}

	/**
	 * Creates a new Degree Resource
	 *
	 * @param {object} data - The default degree data.
	 * @param {Array<mongoose.Schema.Types.ObjectId>} departments - The departments associated with the degree.
	 * @param {object} user - The user associated with creating the degree resource.
	 */
	async createNewDegreeImp(data, departments, user) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const emp = await NonAcademicEmployee.findById({ _id: user._id }).session(
				session
			);
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
		} catch (error) {
			basicLogger.error(error);
			session.abortTransaction();
		} finally {
			session.endSession();
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
		} catch (error) {
			basicLogger.error(error);
			session.abortTransaction();
		} finally {
			session.endSession();
		}
	}

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
		} catch (error) {
			basicLogger.error(error);
			session.abortTransaction();
		} finally {
			session.endSession();
		}
	}

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
			await result.save(session);
			await session.commitTransaction();
		} catch (error) {
			basicLogger.error(error);
			session.abortTransaction();
		} finally {
			session.endSession();
		}
	}

	/**
	 * Creates a new Department Resource
	 *
	 * @param {object} data - The department data.
	 * @param {object} user - The user associated with creating the resource
	 */
	async createNewDeptImp(data, user) {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const emp = await NonAcademicEmployee.findById({ _id: user._id }).session(
				session
			);
			data.faculty = emp.faculty;
			const department = await Department.create(data);
			await department.save(session);
			const updateFaculty = await Faculty.findByIdAndUpdate(
				{ _id: emp.faculty },
				{ $push: { departments: department } }
			).session(session);
			session.commitTransaction();
		} catch (error) {
			basicLogger.error(error);
			session.abortTransaction();
		} finally {
			session.endSession();
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
			const emp = await NonAcademicEmployee.findById({
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
		} catch (error) {
			basicLogger.error(error);
			await session.abortTransaction();
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
			const emp = await NonAcademicEmployee.findById({
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
		} catch (error) {
			basicLogger.error(error);
			await session.abortTransaction();
		} finally {
			session.endSession();
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
	 */
	async createNewWebmasterImp(data) {
		const genPassword = "";
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			var newWebmaster = await Webmaster.register(data, genPassword, {
				session,
			});
		} catch (error) {
			basicLogger.error(error);
			await session.abortTransaction();
		} finally {
			session.endSession();
			return newWebmaster;
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
			var newEmployee = await NonAcademicEmployee.register(data, genPassword, {
				session,
			});
		} catch (error) {
			basicLogger.error(error);
			await session.abortTransaction();
		} finally {
			session.endSession();
			return newEmployee;
		}
	}
}

module.exports = new Database();