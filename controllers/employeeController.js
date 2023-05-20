const database = require('../database/database');
const { basicLogger } = require('../utils/logger/logger');


class EmployeeController {
    constructor() {

    }

    async createNewLecturer(data, employee) {
        try {
            const result = await database.createNewLecturer(data, employee);
            return result;
        } catch (error) {
            basicLogger.error(error);
        }
    }

    async createAnUndergraduate(data, employee) {
        try {
            const result = await database.createNewUndergraduate(data, employee);
        } catch (error) {
            basicLogger(error);
        }
    }
}


module.exports = new EmployeeController();

