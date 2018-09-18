const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'e-mail format wrong']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    }
}, {
        timestamps: true
    })

userSchema.plugin(uniqueValidator, { message: 'email is already taken' });



const User = mongoose.model('User', userSchema);

module.exports = User