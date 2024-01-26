const assert = require("assert");
const assistantRegistrarController = require("../controllers/assistantRegistrarController");
const sinon = require("sinon");

describe("createUndergraduate", () => {
	it("should create a new undergraduate and return success message", async () => {
		const mockReq = {
			body: {},
			user: {},
		};

		const mockRes = {
			status: true,
			// json: function (data) {
			// 	assert.deepStrictEqual(data, {
			// 		message: "resource successfully created",
			// 	});
			// },
			message: "Resource successfully created",
		};

		const mockCreateAnUndergraduate = sinon.stub(
			assistantRegistrarController,
			"createAnUndergraduate"
		);
		mockCreateAnUndergraduate.resolves(mockRes);

		const result = await assistantRegistrarController.createAnUndergraduate(
			mockReq.body,
			mockReq.user
		);
		// console.log(result);
		assert.strictEqual(mockCreateAnUndergraduate.calledOnce, true);
		assert.deepStrictEqual(result, {
			status: true,
			message: "Resource successfully created",
		});

		mockCreateAnUndergraduate.restore();
	});
});
