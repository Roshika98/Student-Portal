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
}

module.exports = new AssistantRegistrarController();
