const mongoose = require('mongoose');
const models = require('../models');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.normalize(path.join(__dirname, '../.env'))
})

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('database connected');
    await seedData();
});

var myfaculty = {
    name: 'Faculty of Applied Sciences'
}

var mydepartments = [
    'Department of Computing & Information Systems',
    'Department of Electronics',
    'Department of Industrial Management',
    'Department of Mathematical Sciences'
];

var underGrad = {
    name: 'Roshika Perera',
    studentId: '182097',
    batch: 18,
    email: 'pereraroshika98@gmail.com',
    dateOfBirth: new Date('1998/10/12'),
    enrolledDate: new Date('2019/02/14')
};

async function seedData() {
    const session = await db.startSession();
    session.startTransaction();

    try {
        // Perform multiple database operations within the transaction

        var newfaculty = new models.Faculty(myfaculty);
        // await newfaculty.save({ session });
        // throw new Error('error thrown');
        const newdepartments = [];
        mydepartments.forEach(async dept => {
            var newDept = new models.Department({
                name: dept,
                faculty: newfaculty
            });
            await newDept.save({ session });
            newdepartments.push(newDept);
            // console.log(newfaculty);
        });
        await newfaculty.save({ session });
        console.log(newfaculty);
        // throw new Error('error thrown');
        var newUndergrad = await models.Undergraduate.register(
            {
                name: underGrad.name,
                studentId: underGrad.studentId,
                email: underGrad.email,
                enrolledDate: underGrad.enrolledDate,
                dateOfBirth: underGrad.dateOfBirth,
                batch: underGrad.batch,
                faculty: newfaculty,
            }, 'abcd1234'
        )
        // Additional operations...
        const faculty = await models.Faculty.findByIdAndUpdate(newfaculty.id, { $push: { departments: newdepartments } },
            { new: true }).session(session);
        console.log(faculty);
        // Commit the transaction
        await session.commitTransaction();
    } catch (error) {
        // Handle the error and abort the transaction
        console.error('Transaction aborted:', error);
        await session.abortTransaction();
    } finally {
        // End the session
        session.endSession();
    }

}

// seedData();