const assistantRegistrarController = require("../../controllers/assistantRegistrarController");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

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

const uploadfile = async (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) {
			throw err;
		}
		let oldPath = files.someExpressFiles[0].filepath;
		let newPath = path.resolve(
			__dirname,
			"../../" + "temp/" + files.someExpressFiles[0].originalFilename
		);
		fs.rename(oldPath, newPath, async (err) => {
			if (err) throw err;
			await assistantRegistrarController.createUndergraduateBulk(
				newPath,
				req.user
			);
			fs.rm(newPath, (err) => {
				console.log("file removed");
			});
			res.status(200).json({ message: "Bulk resources created successfully" });
		});
	});
};

module.exports = { createUndergraduate, createResult, uploadfile };
