const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fullName: String,
    joined: {
        type: Date,
        default: Date.now
    },
    bucket: {
        type: Array,
        default: []
    }
}).plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);