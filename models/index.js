const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const facultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    departments: [{
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }]
});


const departmentSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	faculty: {
		type: Schema.Types.ObjectId,
		ref: "Faculty",
		required: true,
	},
});


const degreeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	degreeCode: {
		type: String,
		default: "",
	},
	faculty: {
		type: Schema.Types.ObjectId,
		ref: "Faculty",
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	departments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Department",
		},
	],
});

const courseModuleSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	department: {
		type: Schema.Types.ObjectId,
		ref: "Department",
		required: true,
	},
	yearOfStudy: {
		type: Number,
		required: true,
	},
	courseCode: {
		type: String,
		required: true,
	},
	credits: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
});

const yearOfStudySchema = new Schema({
	year: {
		type: Number,
		required: true,
	},
	degree: {
		type: Schema.Types.ObjectId,
		ref: "Degree",
		required: true,
	},
	mandotaryCourseModules: [
		{
			type: Schema.Types.ObjectId,
			ref: "CourseModule",
		},
	],
	optionalCourseModules: [
		{
			type: Schema.Types.ObjectId,
			ref: "CourseModule",
		},
	],
});

const gradeSchema = new Schema({
	grade: {
		type: String,
		enum: [
			"A+",
			"A",
			"A-",
			"B+",
			"B",
			"B-",
			"C+",
			"C",
			"C-",
			"D+",
			"D",
			"E",
			"I",
		],
		required: true,
	},
	gpa: {
		type: Number,
		required: true,
	},
});

const resultSchema = new Schema({
	undergraduate: {
		type: Schema.Types.ObjectId,
		ref: "Undergraduate",
		required: true,
	},
	courseModule: {
		type: Schema.Types.ObjectId,
		ref: "CourseModule",
		required: true,
	},
	sittingNumber: {
		type: Number,
		required: true,
		default: 1,
	},
	examTaken: {
		type: Boolean,
		required: true,
		default: false,
	},
	grade: {
		type: Schema.Types.ObjectId,
		ref: "Grade",
		required: true,
		default: null,
	},
	previousGrades: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: "Grade",
			},
		],
		default: null,
	},
	// Add any other relevant fields specific to results
});

const undergraduateSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	studentId: {
		type: String,
		required: true,
		unique: true,
	},
	type: { type: String, default: "undergraduate" },
	faculty: {
		type: Schema.Types.ObjectId,
		ref: "Faculty",
		required: true,
	},
	batch: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	enrolledDate: {
		type: Date,
		required: true,
	},
	program: {
		type: Schema.Types.ObjectId,
		ref: "Degree",
		required: true,
		default: null,
	},
	joinedClubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
});

const nonAcademicEmployeeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	employeeId: {
		type: String,
		required: true,
		unique: true,
	},
	type: { type: String, default: "employee" },
	faculty: {
		type: Schema.Types.ObjectId,
		ref: "Faculty",
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	position: {
		type: String,
		enum: ["nonacademic-coordinator", "academic-coordinator"],
		required: true,
	},
});

const lecturerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	employeeId: {
		type: String,
		required: true,
		unique: true,
	},
	type: { type: String, default: "lecturer" },
	faculty: {
		type: Schema.Types.ObjectId,
		ref: "Faculty",
		required: true,
	},
	department: {
		type: Schema.Types.ObjectId,
		ref: "Department",
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	position: {
		type: String,
		required: true,
	},
});

const webasterSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	type: { type: String, default: "webmaster" },
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});
// todo - model changed to hold an array of coursemodules----change other implementations accordingly
const lecturerCourseModuleSchema = new Schema({
	lecturer: {
		type: Schema.Types.ObjectId,
		ref: "Lecturer",
		required: true,
	},
	courseModule: [
		{
			type: Schema.Types.ObjectId,
			ref: "CourseModule",
			required: true,
		},
	],
});

const clubSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	webmaster: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Webmaster",
		required: true,
	},
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Undergraduate" }],
	createdDate: { type: Date, default: Date.now },
});

nonAcademicEmployeeSchema.plugin(passportLocalMongoose, {
	usernameField: "employeeId",
	usernameQueryFields: ["employeeId"],
});
undergraduateSchema.plugin(passportLocalMongoose, {
	usernameField: "studentId",
	usernameQueryFields: ["studentId"],
});
lecturerSchema.plugin(passportLocalMongoose, {
	usernameField: "employeeId",
	usernameQueryFields: ["employeeId"],
});
webasterSchema.plugin(passportLocalMongoose, {
	usernameField: "username",
	usernameQueryFields: ["username"],
});

const Employee = mongoose.model(
	"NonAcademicEmployee",
	nonAcademicEmployeeSchema
);
const Undergraduate = mongoose.model("Undergraduate", undergraduateSchema);
const Result = mongoose.model("Result", resultSchema);
const Grade = mongoose.model("Grade", gradeSchema);
const CourseModule = mongoose.model("CourseModule", courseModuleSchema);
const Degree = mongoose.model("Degree", degreeSchema);
const Department = mongoose.model("Department", departmentSchema);
const Faculty = mongoose.model("Faculty", facultySchema);
const Lecturer = mongoose.model("Lecturer", lecturerSchema);
const LecturerCourse = mongoose.model(
	"LecturerCourse",
	lecturerCourseModuleSchema
);
const YearOfStudy = mongoose.model("YearOfStudy", yearOfStudySchema);
const Club = mongoose.model("Club", clubSchema);
const Webmaster = mongoose.model("Webmaster", webasterSchema);

module.exports = {
	Undergraduate,
	Employee,
	Lecturer,
	Webmaster,
	Faculty,
	Department,
	Degree,
	Grade,
	Result,
	CourseModule,
	LecturerCourse,
	YearOfStudy,
	Club,
};