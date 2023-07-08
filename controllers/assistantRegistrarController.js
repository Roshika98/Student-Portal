const asstRegistrarResourceHandler = require("../database/resourceHandlers/asstRegistrarResourceHandler");
const EmployeeController = require("./employeeController");

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
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new AssistantRegistrarController();
