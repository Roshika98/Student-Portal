const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    regNo: { type: String },
    email: { type: String },
    mobile: String,
    address: String,
    name: String,
    type: {
        type: String,
        enum: ['student', 'lecturer'],
        default: 'student'
    }
});


userSchema.plugin(passportLocalMongoose, { usernameField: 'regNo', usernameQueryFields: ['regNo'] });


module.exports = mongoose.model('User', userSchema);