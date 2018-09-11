const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
      })
]

const passValidator = [
    validate({
        validator: 'isLength',
        arguments: [7, 16],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
      })
]

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        validate: nameValidator
    },
    email : {
        type: String,
        unique: true,
        required : true
    },
    password : {
        type: String,
        required : true,
        validate: passValidator
    },
    cart : [{
        type : Schema.Types.ObjectId,
        ref : 'Item'
    }],
    purchase : [{
        type : Schema.Types.ObjectId,
        ref : 'Item'
    }]
}, {timestamps:true})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User