const assert = require("assert");
const assistantRegistrarController = require("../controllers/assistantRegistrarController");
const sinon = require("sinon");

describe("createUndergraduate", () => {
	it("should create a new undergraduate and return success message", async () => {
		const mockReq = {
			body: {
				// Your mock request body here
			},
			user: {
				// Your mock user object here
			},
		};

		const mockRes = {
			status: function (status) {
				assert.strictEqual(status, 200);
				return this;
			},
			json: function (data) {
				assert.deepStrictEqual(data, {
					message: "resource successfully created",
				});
			},
		};

		const mockCreateAnUndergraduate = sinon.stub(
			assistantRegistrarController,
			"createAnUndergraduate"
		);
		mockCreateAnUndergraduate.resolves({ message: 1 });

		const result = await assistantRegistrarController.createAnUndergraduate(
			mockReq,
			mockRes
		);
		// console.log(result);
		assert.strictEqual(mockCreateAnUndergraduate.calledOnce, true);
		assert.deepStrictEqual(result, { message: 1 });

		mockCreateAnUndergraduate.restore();
	});
});
