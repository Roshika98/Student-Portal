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





}