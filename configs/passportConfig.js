const passport = require('passport');
const strategy = require('../utils/security/strategy');
const {
	Undergraduate,
	Lecturer,
	NonAcademicEmployee,
	Webmaster,
	Employee,
} = require("../models");

passport.use('undergraduate', strategy.undergraduateStrategy);
passport.use('lecturer', strategy.lecturerStrategy);
passport.use('employee', strategy.employeeStrategy);
passport.use('webmaster', strategy.webmasterStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Undergraduate.findById(id)
			.select({ _id: 1, type: 1 })
			.then((user) => {
				if (user !== null) {
					done(null, user);
				} else {
					Lecturer.findById(id)
						.select({ _id: 1, type: 1 })
						.then((employee) => {
							if (employee !== null) {
								done(null, employee);
							} else {
								Employee.findById(id)
									.select({ _id: 1, type: 1 })
									.then((employee) => {
										if (employee !== null) {
											done(null, employee);
										} else {
											Webmaster.findById(id)
												.select({ _id: 1, type: 1 })
												.then((webmaster) => {
													done(null, webmaster);
												});
										}
									});
							}
						});
				}
			});
});

module.exports = passport;