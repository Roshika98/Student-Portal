const asstRegistrarResourceHandler = require("../database/resourceHandlers/asstRegistrarResourceHandler");
const EmployeeController = require("./employeeController");
const Excel = require("exceljs");
const utility = require("../utils");
const path = require("path");

/**
 * A class controlling the procedures of Assistant Registrar
 * @class
 */

class AssistantRegistrarController extends EmployeeController {
	constructor() {
		super();
		this.resourceHandler = asstRegistrarResourceHandler;
	}

	/**
	 * Wrapper function for creating a single undergraduate resource
	 * @param {object} data -  undergraduate data
	 * @param {object} employee - employee associated with the creation
	 */
	async createAnUndergraduate(data, employee) {
		try {
			const result = await this.resourceHandler.createNewUndergraduateImp(
				data,
				employee
			);
			return { status: true, message: "Resource successfully created" };
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Wrapper function for creating bulk undergraduate resources
	 * @param {object} filepath -  undergraduates data file path (.xlsx)
	 * @param {object} employee - employee associated with the creation
	 */
	async createUndergraduateBulk(filepath, employee) {
		try {
			const data = await this.#getBulkUndergradData(filepath);

			for (let i = 0; i < data.length; i++) {
				const result = await this.resourceHandler.tempCreateNewUndergraduateImp(
					data[i]
				);
			}
			await this.#writeLoginfile(
				data,
				"Login details of Undergraduates",
				["id", "name", "password"],
				`undergradlogins_${data[0].batch}.xlsx`
			);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Wrapper function for creating a single Result resource
	 * @param {object} data -  Result data.
	 * @param {string} data.undergraduate - undergraduate's studentId associated with the result.
	 * @param {string} data.courseModule - Name of the course Module associated with the result.
	 */
	async createNewResult(data) {
		try {
			const courseModule = await this.resourceHandler.getCourseModuleDetailsImp(
				data.courseModule
			);
			const undergraduate =
				await this.resourceHandler.getUndergraduateDetailsImp(
					data.undergraduate
				);
			await this.resourceHandler.createNewResultImp();
			return { message: "successful" };
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Creates new Undergraduates in a Bulk
	 *
	 * @param {String} filepath - The undergraduate data file path.
	 */
	async #getBulkUndergradData(filepath) {
		const workbook = new Excel.Workbook();
		const results = [];
		try {
			const excelFile = await workbook.xlsx.readFile(filepath);
			const worksheet = excelFile.getWorksheet(1);
			if (!this.#checkfileValidity(worksheet, filepath)) {
				throw new Error("invalid file format");
			}
			for (let i = 2; i <= worksheet.rowCount; i++) {
				var data = {
					studentId: worksheet.getCell(i, 1).value,
					name: worksheet.getCell(i, 2).value,
					email: worksheet.getCell(i, 3).value.text,
					enrolledDate: utility.getUTCDate(""),
					dateOfBirth: utility.getUTCDate(worksheet.getCell(i, 5).value) + 20,
					batch: parseInt(worksheet.getCell(i, 6).value),
					password: utility.generatePassword(),
				};
				results.push(data);
			}
			return results;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Writes the login credentials to an excel file for future use
	 *
	 * @param {object} data
	 * @param {string} heading
	 * @param {string[]} columns
	 * @param {string} filename
	 */
	async #writeLoginfile(data, heading, columns, filename) {
		const workbook = new Excel.Workbook();
		const worksheet = workbook.addWorksheet("logins");
		worksheet.mergeCells("A1:D1");
		worksheet.getCell(1, 1).value = heading;

		for (let i = 1; i - 1 < columns.length; i++) {
			worksheet.getCell(2, i).value = columns[i - 1];
		}

		for (let i = 3; i - 3 < data.length; i++) {
			const element = data[i - 3];
			worksheet.getCell(i, 1).value = element.studentId
				? element.studentId
				: element.empId
				? element.empId
				: "";
			worksheet.getCell(i, 2).value = element.name;
			worksheet.getCell(i, 3).value = element.password;
		}
		await workbook.xlsx.writeFile(
			path.resolve(__dirname, "../temp/logins/" + filename)
		);
	}

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
			worksheet.getCell(1, 1).value.toLowerCase() == "studentid" &&
			worksheet.getCell(1, 2).value.toLowerCase() == "name" &&
			worksheet.getCell(1, 3).value.toLowerCase() == "email" &&
			worksheet.getCell(1, 4).value.toLowerCase() == "enrolleddate" &&
			worksheet.getCell(1, 5).value.toLowerCase() == "dateofbirth" &&
			worksheet.getCell(1, 6).value.toLowerCase() == "batch" &&
			worksheet.rowCount >= 1
		);
	}
}

module.exports = new AssistantRegistrarController();
