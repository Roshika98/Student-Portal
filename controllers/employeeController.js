const database = require("../database/resourceHandler");
const { basicLogger } = require("../utils/logger/logger");

class EmployeeController {
	constructor() {
		this._database = null;
	}
}

module.exports = EmployeeController;
