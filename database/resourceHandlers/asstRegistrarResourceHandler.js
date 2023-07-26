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
} = require("../../models");
const ResourceHandler = require("../resourceHandler");
const Excel = require("exceljs");

class AsstRegistrarResourceHandler extends ResourceHandler {
	constructor() {
		super();
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
	 * @param {object} employee - The user associated with creating the resource.
	 */
	async createNewUndergraduateImp(data, employee) {
		const session = await this.mongoose.startSession();
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
			this.logger.info("Transaction successful");
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		}
	}

	/**
	 * Creates new Undergraduates in a Bulk
	 *
	 * @param {String} filepath - The undergraduate data file path.
	 * @param {object} employee - The user associated with creating the resource.
	 */
	async createNewUndergraduatesBulkImp(filepath, employee) {
		const workbook = new Excel.Workbook();
		try {
			const excelFile = await workbook.xlsx.readFile(filepath);
			const worksheet = excelFile.getWorksheet(1);
			if (!this.#checkfileValidity(worksheet, filepath)) {
				throw new Error("invalid file format");
			}
			for (let i = 2; i < worksheet.rowCount; i++) {
				// todo ---- Iterate through each row in excel sheet and create new undergraduates accordingly
				console.log(
					worksheet.getCell(i, 1).value + " : " + worksheet.getCell(i, 2)
				);
			}
		} catch (error) {
			throw error;
		}
	}

	//   TODO implement this on assistantRegistrar controller class
	/**
	 * Creates a new Result Resource
	 * @param {object} data - The Result data.
	 * @param {mongoose.Schema.Types.ObjectId} data.undergraduate - The undergraduate associated with the Result.
	 * @param {mongoose.Schema.Types.ObjectId} data.courseModule - The courseModule associated with the Result.
	 */
	async createNewResultImp(data) {
		const session = await this.mongoose.startSession();
		session.startTransaction();
		try {
			const result = await Result.create(data);
			result.save(session);
			await session.commitTransaction();
			await session.endawait();
			this.logger.info("Transaction successful");
		} catch (error) {
			await session.abortTransaction();
			await session.endSession();
			throw error;
		}
	}

	async createNewResultsBulkImp(filepath) {}

	/**
	 * Checks whether the excel file is upto code
	 *
	 * @param {object} worksheet
	 * @param {string} filepath
	 * @returns {boolean}
	 */
	#checkfileValidity(worksheet, filepath) {
		const filesplit = filepath.split(".");
		return (
			filesplit[1] &&
			(filesplit[1] == "xlsx" || filesplit[1] == "csv") &&
			worksheet.getCell(1, 1).value.toLowerCase() == "index" &&
			worksheet.getCell(1, 2).value.toLowerCase() == "name" &&
			worksheet.rowCount >= 1
		);
	}
}

module.exports = new AsstRegistrarResourceHandler();


