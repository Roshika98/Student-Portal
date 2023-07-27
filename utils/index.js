class Utility {
	constructor() {}

	/**
	 * Utility function for retreiving utc date
	 *
	 * @param {string} date
	 * @returns  utc format date object
	 */
	getUTCDate(date) {
		let localDate;
		if (date !== "") {
			localDate = new Date(date);
		} else localDate = new Date();
		let utcDate = Date.UTC(
			localDate.getUTCFullYear(),
			localDate.getUTCMonth(),
			localDate.getUTCDate(),
			localDate.getUTCHours(),
			localDate.getUTCMinutes(),
			localDate.getUTCSeconds(),
			localDate.getUTCMilliseconds()
		);
		return utcDate;
	}

	generatePassword() {
		var length = 8,
			charset =
				"@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
			password = "";
		for (var i = 0, n = charset.length; i < length; ++i) {
			password += charset.charAt(Math.floor(Math.random() * n));
		}
		return password;
	}
}

module.exports = new Utility();
