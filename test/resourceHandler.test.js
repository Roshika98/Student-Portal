const sinon = require("sinon");
const assert = require("assert");
const AccadCoordResourceHandler = require("../database/resourceHandlers/accadCoordResourceHandler"); // Update the path

describe("AccadCoordResourceHandler function calls Resource creation unit tests", () => {
	let mockSession;
	let mockMongoose;

	beforeEach(() => {
		mockSession = {
			startTransaction: sinon.stub(),
			commitTransaction: sinon.stub(),
			endSession: sinon.stub(),
			abortTransaction: sinon.stub(),
		};

		mockMongoose = {
			startSession: sinon.stub().resolves(mockSession),
		};
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should create a new Course Module Resource", async () => {
		const mockCourseModule = { save: sinon.stub() };
		const CourseModule = {
			create: sinon.stub().resolves(mockCourseModule),
		};
		const models = {
			CourseModule,
		};
		// sinon.stub(CourseModule, "create").resolves(mockCourseModule);

		const resourceHandler = new AccadCoordResourceHandler(mockMongoose, models);
		await resourceHandler.createCourseModuleImp({});

		assert.strictEqual(mockMongoose.startSession.calledOnce, true);
		assert.strictEqual(mockSession.startTransaction.calledOnce, true);
		assert.strictEqual(mockCourseModule.save.calledOnce, true);
		assert.strictEqual(mockSession.commitTransaction.calledOnce, true);
		assert.strictEqual(mockSession.endSession.calledOnce, true);
	});

	it("should create a new Year of Study Resource", async () => {
		const mockYearOfStudy = { save: sinon.stub() };
		const YearOfStudy = {
			create: sinon.stub().resolves(mockYearOfStudy),
		};
		const models = {
			YearOfStudy,
		};
		// sinon.stub(YearOfStudy, "create").resolves(mockYearOfStudy);

		const resourceHandler = new AccadCoordResourceHandler(mockMongoose, models);
		await resourceHandler.createNewYearOfStudyImp({});

		assert.strictEqual(mockMongoose.startSession.calledOnce, true);
		assert.strictEqual(mockSession.startTransaction.calledOnce, true);
		assert.strictEqual(mockYearOfStudy.save.calledOnce, true);
		assert.strictEqual(mockSession.commitTransaction.calledOnce, true);
		assert.strictEqual(mockSession.endSession.calledOnce, true);
	});

	it("should create a new Club Resource", async () => {
		const mockClub = { save: sinon.stub() };
		const mockWebmaster = { save: sinon.stub() };
		const Webmaster = {
			findById: sinon.stub().resolves(mockWebmaster),
		};
		const Club = {
			create: sinon.stub().resolves(mockClub),
		};
		const models = {
			Club,
			Webmaster,
		};
		// sinon.stub(Club, "create").resolves(mockClub);

		const resourceHandler = new AccadCoordResourceHandler(mockMongoose, models);
		await resourceHandler.createNewClubImp({});

		assert.strictEqual(mockMongoose.startSession.calledOnce, true);
		assert.strictEqual(mockSession.startTransaction.calledOnce, true);
		assert.strictEqual(mockClub.save.calledOnce, true);
		assert.strictEqual(mockSession.commitTransaction.calledOnce, true);
		assert.strictEqual(mockSession.endSession.calledOnce, true);
	});

	it("should create a new Department Resource", async () => {
		const mockDepartment = { save: sinon.stub() };
		const mockEmployee = { save: sinon.stub() };
		const mockFaculty = { sace: sinon.stub() };
		const Employee = {
			findById: sinon.stub().resolves(mockEmployee),
		};
		const Department = {
			create: sinon.stub().resolves(mockDepartment),
		};
		const Faculty = {
			findByIdAndUpdate: sinon.stub().resolves(mockFaculty),
		};
		const models = {
			Department,
			Employee,
			Faculty,
		};
		// sinon.stub(Club, "create").resolves(mockDepartment);

		const resourceHandler = new AccadCoordResourceHandler(mockMongoose, models);
		await resourceHandler.createNewDeptImp({});

		assert.strictEqual(mockMongoose.startSession.calledOnce, true);
		assert.strictEqual(mockSession.startTransaction.calledOnce, true);
		assert.strictEqual(mockDepartment.save.calledOnce, true);
		assert.strictEqual(mockSession.commitTransaction.calledOnce, true);
		assert.strictEqual(mockSession.endSession.calledOnce, true);
	});
});
