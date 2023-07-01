const { basicLogger } = require("../utils/logger/logger");
const EmployeeController = require("./employeeController");

class AssistantRegistrarController extends EmployeeController {
	constructor() {
		super();
	}

	/**
	 * Wrapper function for creating a single undergraduate resource
	 * @param {object} data -  undergraduate data
	 * @param {object} employee - employee associated with the creation
	 */
	async createAnUndergraduate(data, employee) {
		try {
			const result = await this._database.createNewUndergraduateImp(
				data,
				employee
			);
		} catch (error) {
			basicLogger(error);
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
			const courseModule = await this._database.getCourseModuleDetailsImp(
				data.courseModule
			);
			const undergraduate = await this._database.getUndergraduateDetailsImp(
				data.undergraduate
			);
			await this._database.createNewResultImp();
		} catch (error) {
			basicLogger.error(error);
		}
	}
}

module.exports = new AssistantRegistrarController();
