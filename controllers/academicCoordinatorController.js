const { basicLogger } = require("../utils/logger/logger");
const EmployeeController = require("./employeeController");

class AcademicCoordinatorController extends EmployeeController {
	constructor() {
		super();
	}

	/**
	 * Wrapper function for creating a new department.
	 * @param {object} data - data regarding the new department
	 * @param {string} data.name - The name of the department.
	 * @param {object} employee - employee creating the new resource.
	 */
	async createNewDepartment(data, employee) {
		try {
			await this._database.createNewDeptImp(data, employee);
			basicLogger.info("New department successfully created");
		} catch (error) {
			basicLogger.error(error);
		}
	}

	/**
	 * Wrapper function for creating a single lecturer
	 * @param {object} data - lecturer data.
	 * @param {object} employee - employee associated with the creation.
	 */
	async createNewLecturer(data, employee) {
		try {
			const result = await this._database.createNewLecturerImp(data, employee);
			return result;
		} catch (error) {
			basicLogger.error(error);
		}
	}

	/**
	 * Wrapper function for creating a new Degree
	 *
	 * @param {object} data - data regarding the new degree resource.
	 * @param {string} data.name - The name of the degree.
	 * @param {string} data.degreeCode - the respective code of the degree.
	 * @param {string} data.duration - the duration of the relevant degree.
	 * @param {string[]} data.departments - the departments this degree belongs to.
	 * @param {object} employee - employee associated with the operation.
	 */
	async createNewDegree(data, employee) {
		try {
			const departments = await this._database.getDepartmentDetailsImp({
				departments: data.departments,
			});
			await this._database.createNewDegreeImp(
				{ ...data, duration: parseInt(data.duration) },
				departments,
				employee
			);
		} catch (error) {
			basicLogger.error(error.stack);
		}
	}

	/**
	 * Wrapper function for creating a new Course Module
	 *
	 * @param {object} data - data regarding the new degree resource.
	 * @param {string} data.name - The name of the coursemodule.
	 * @param {string} data.courseCode - the respective code of the module.
	 * @param {string} data.yearOfStudy - the yearOfStudy of the relevant degree.
	 * @param {string} data.credits - number of credits of the module.
	 * @param {string} data.description - description of the coursemodule.
	 * @param {string} data.department - the departments this degree belongs to.
	 */
	async createNewCourseModules(data) {
		try {
			const department = await this._database.getDepartmentDetailsImp(
				data.department
			);
			await this._database.createCourseModuleImp({
				...data,
				yearOfStudy: parseInt(data.yearOfStudy),
				credits: parseInt(data.credits),
				department: department,
			});
		} catch (error) {
			basicLogger.error(error.stack);
		}
	}

	/**
	 * Wrapper function for creating a new YearOfStudy Module
	 *
	 * @param {object} data - data regarding the new degree resource.
	 * @param {string} data.year - The year of the yearOfStudy.
	 * @param {string[]} data.mandotaryCourseModules - the respective mandatory modules of the yearofstudy.
	 * @param {string[]} data.optionalCourseModules - the respective optional modules of the yearofstudy.
	 * @param {string} data.degree - the respective degree of the YearOfStudy.
	 */
	async createNewYearOfStudy(data) {
		try {
			const mandotaryCourseModules =
				await this._database.getCourseModuleDetailsImp(
					data.mandotaryCourseModules
				);
			const optionalCourseModules =
				await this._database.getCourseModuleDetailsImp(
					data.optionalCourseModules
				);
			const degree = await this._database.getDegreeDetailsImp(data.degree);
			await this._database.createNewYearOfStudyImp({
				...data,
				year: parseInt(data.year),
				mandotaryCourseModules: mandotaryCourseModules,
				optionalCourseModules: optionalCourseModules,
				degree: degree,
			});
		} catch (error) {
			basicLogger.error(error.stack);
		}
	}
}

module.exports = new AcademicCoordinatorController();
