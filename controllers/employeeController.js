const database = require('../database/database');
const { basicLogger } = require('../utils/logger/logger');


class EmployeeController {
	_database = database;

	constructor() {}

	/**
	 * Wrapper function for creating a new Club
	 * @param {object} webmasterDat - Data regarding the webmaster associated with the club.
	 * @param {object} clubDat - Data regarding the new club
	 */
	async createNewClub(webmasterDat, clubDat) {
		try {
			const webmaster = await this._database.createNewWebmasterImp(
				webmasterDat
			);
			await database.createNewClubImp({ ...clubDat, webmaster: webmaster });
			basicLogger.info("new club created");
		} catch (error) {
			basicLogger.error(error);
		}
	}
}

module.exports = EmployeeController;

