const Database = require("../database");
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

class AccadCoordResourceHandler extends Database {
	constructor() {
		super();
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
		const session = await this.mongoose.startSession();
		session.startTransaction();
		try {
			const result = await CourseModule.create(data);
			await result.save(session);
			await session.commitTransaction();
			await session.endSession();
			this.logger.info("Transaction successful");
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
		const session = await this.mongoose.startSession();
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
			this.logger.info("Transaction successful");
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
		const session = await this.mongoose.startSession();
		session.startTransaction();
		try {
			const yearOfStudy = await YearOfStudy.create(data);
			yearOfStudy.save(session);
			await session.commitTransaction();
			await session.endSession();
			this.logger.info("Transaction successful");
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
		const session = await this.mongoose.startSession();
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
			this.logger.info("Transaction successful");
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
		const session = await this.mongoose.startSession();
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
			this.logger.info("Transaction successful");
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
		const session = await this.mongoose.startSession();
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
			this.logger.info("Transaction successful");
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
		const session = await this.mongoose.startSession();
		session.startTransaction();
		try {
			var newWebmaster = await Webmaster.register(data, genPassword, {
				session,
			});
			session.commitTransaction();
			session.endSession();
			this.logger.info("Transaction successful");
			return newWebmaster.id !== null ? newWebmaster.id : null;
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
		const session = await this.mongoose.startSession();
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
			this.logger.info("Transaction successful");
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		}
	}
}

module.exports = new AccadCoordResourceHandler();
