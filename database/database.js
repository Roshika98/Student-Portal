const mongoose = require('mongoose');
const { Undergraduate,
    Lecturer, NonAcademicEmployee,
    Webmaster, Faculty, Degree,
    Department } = require('../models');
const { basicLogger } = require('../utils/logger/logger');

class Database {
    constructor() {
        basicLogger.info('database controller initiated');
    }


    async createNewLecturer(data, employee) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const faculty = await Faculty.findOne({ _id: employee.faculty }).session(session);
            const department = await Department.findOne({ name: data.deptName }).session(session);
            const lecturer = await Lecturer.register({
                name: data.name,
                employeeId: data.lecId,
                faculty: faculty,
                department: department,
                email: data.email,
                dateOfBirth: new Date(data.dob),
                position: data.position
            }, data.password);
            await session.commitTransaction();
        } catch (error) {
            basicLogger.error(error);
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession()
        }

    }

    async createNewUndergraduate(data, employee) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const faculty = await Faculty.findOne({ _id: employee.faculty }).session(session);
            var newUndergrad = await Undergraduate.register(
                {
                    name: data.name,
                    studentId: data.studentId,
                    email: data.email,
                    enrolledDate: data.enrolledDate,
                    dateOfBirth: data.dateOfBirth,
                    batch: parseInt(data.batch),
                    faculty: faculty,
                }, data.password
            )
            await session.commitTransaction();
        } catch (error) {
            basicLogger.error(error);
            await session.abortTransaction();
        } finally {
            session.endSession()
        }
    }




}

module.exports = new Database();