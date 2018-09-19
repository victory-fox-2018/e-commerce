const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { decryptPassword } = require('../helpers/helper')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'e-mail format wrong']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, {
        timestamps: true
    })

userSchema.plugin(uniqueValidator, { message: 'email is already taken' });

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = decryptPassword(this.password)
    }
    next()
})


const User = mongoose.model('User', userSchema);

module.exports = User