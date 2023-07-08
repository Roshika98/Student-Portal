const accadCoordResourceHandler = require("../database/resourceHandlers/accadCoordResourceHandler");
const { basicLogger } = require("../utils/logger/logger");
const EmployeeController = require("./employeeController");

class AcademicCoordinatorController extends EmployeeController {
	constructor() {
		super();
		this.resourceHandler = accadCoordResourceHandler;
	}

	/**
	 * Wrapper function for creating a new department.
	 * @param {object} data - data regarding the new department
	 * @param {string} data.name - The name of the department.
	 * @param {object} employee - employee creating the new resource.
	 */
	async createNewDepartment(data, employee) {
		try {
			await this.resourceHandler.createNewDeptImp(data, employee);
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
			const result = await this.resourceHandler.createNewLecturerImp(
				data,
				employee
			);
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
			const departments = await this.resourceHandler.getDepartmentDetailsImp({
				departments: data.departments,
			});
			await this.resourceHandler.createNewDegreeImp(
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
			const department = await this.resourceHandler.getDepartmentDetailsImp(
				data.department
			);
			await this.resourceHandler.createCourseModuleImp({
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
				await this.resourceHandler.getCourseModuleDetailsImp(
					data.mandotaryCourseModules
				);
			const optionalCourseModules =
				await this.resourceHandler.getCourseModuleDetailsImp(
					data.optionalCourseModules
				);
			const degree = await this.resourceHandler.getDegreeDetailsImp(
				data.degree
			);
			await this.resourceHandler.createNewYearOfStudyImp({
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

	/**
	 * Wrapper function for creating a new Lecturer & Coursemodule association.
	 * @param {object} data - data regarding the new Association
	 * @param {string} data.lecturer - The document Id of the lecturer.
	 * @param {string} data.courseModule - the document Id of the coursemodule.
	 */
	async createNewLecturerCourseAssociation(data) {
		try {
			await this.resourceHandler.createNewLecturerCourseAssociationImp(data);
		} catch (error) {
			basicLogger.error(error.stack);
		}
	}

	/**
	 * Wrapper function for creating a new Club
	 * @param {object} webmasterDat - Data regarding the webmaster associated with the club.
	 * @param {object} clubDat - Data regarding the new club
	 */
	async createNewClub(webmasterDat, clubDat) {
		try {
			const webmaster = await this.resourceHandler.createNewWebmasterImp(
				webmasterDat
			);
			await database.createNewClubImp({ ...clubDat, webmaster: webmaster });
			basicLogger.info("new club created");
		} catch (error) {
			basicLogger.error(error);
		}
	}
}

module.exports = new AcademicCoordinatorController();
