describe("User Service Unit Tests", function () {
	describe("Save User functionality", function () {
		it("should successfully add a user if the number of users in the DB with the same profiled is zero", async function () {});
		it("should throw an error if the number of users with the same profileId is not zero", async function () {});
	});
});

const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");

const CourseModule = {
	create: async (data) => {
		// Mock the create function
		return { ...data, _id: "mockedId" };
	},
};

class MockSession {
	async startTransaction() {}
	async commitTransaction() {}
	async abortTransaction() {}
	async endSession() {}
}

describe("createCourseModuleImp", () => {
	it("should create a new course module and commit transaction", async () => {
		const sessionStub = new MockSession();
		const startTransactionStub = sinon.stub(sessionStub, "startTransaction");
		const commitTransactionStub = sinon.stub(sessionStub, "commitTransaction");
		const endSessionStub = sinon.stub(sessionStub, "endSession");

		sinon.stub(mongoose, "startSession").resolves(sessionStub);

		const createCourseModuleImp =
			require("../database/resourceHandlers/accadCoordResourceHandler").createCourseModuleImp;

		const data = { name: "Course 101" };
		await createCourseModuleImp(data);

		assert.strictEqual(startTransactionStub.calledOnce, true);
		assert.strictEqual(commitTransactionStub.calledOnce, true);
		assert.strictEqual(endSessionStub.calledOnce, true);

		// Clean up stubs
		mongoose.startSession.restore();
		startTransactionStub.restore();
		commitTransactionStub.restore();
		endSessionStub.restore();
	});

	it("should throw an error and abort transaction", async () => {
		const sessionStub = new MockSession();
		const startTransactionStub = sinon.stub(sessionStub, "startTransaction");
		const abortTransactionStub = sinon.stub(sessionStub, "abortTransaction");
		const endSessionStub = sinon.stub(sessionStub, "endSession");

		sinon.stub(mongoose, "startSession").resolves(sessionStub);

		const createCourseModuleImp =
			require("../database/resourceHandlers/accadCoordResourceHandler").createCourseModuleImp;

		const data = { name: "Invalid Course" };

		// Mock an error during the creation process
		sinon.stub(CourseModule, "create").throws(new Error("Mocked error"));

		try {
			await createCourseModuleImp(data);
		} catch (error) {
			assert.strictEqual(startTransactionStub.calledOnce, true);
			assert.strictEqual(abortTransactionStub.calledOnce, true);
			assert.strictEqual(endSessionStub.calledOnce, true);
			assert.strictEqual(error.message, "Mocked error");
		}

		// Clean up stubs
		mongoose.startSession.restore();
		startTransactionStub.restore();
		abortTransactionStub.restore();
		endSessionStub.restore();
		CourseModule.create.restore();
	});
});
