const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

var userSchema = new Schema({
    name: { type: String, required: [true, "name required"] },
    email: { type: String, required: [true, "email required"], unique: [true, "email already used"] },
    password: { type: String, minlength: 6, required: [true, "password required"] },
}, {
        timestamps: true
    })

userSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})


var User = mongoose.model('User', userSchema)

module.exports = User
