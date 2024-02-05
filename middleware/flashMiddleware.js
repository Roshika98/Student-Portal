module.exports = (req, res, next) => {
	// console.log("flash variable: ", req.flash("error"));
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.locals.warning = req.flash("warning");
	// console.log(res.locals.error);
	next();
};
