const assistantRegistrarController = require("../controllers/assistantRegistrarController");

const createUndergraduate = async (req, res) => {
	const data = req.body;
	var result = await assistantRegistrarController.createAnUndergraduate(
		data,
		req.user
	);
	res.status(200).json({ message: "resource succesfully created" });
};

const createResult = async (req, res) => {
	const data = req.body;
	await assistantRegistrarController.createNewResult(data);
	res.status(200).json({ message: "resource created successfully" });
};

module.exports = { createUndergraduate, createResult };
