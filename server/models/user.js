const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const unique_validator = require('mongoose-unique-validator')

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate : {
            validator: function(v) {
                const check_email =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                return check_email.test(v)
            },
            message : props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
    },
    carts: [{ type: Schema.Types.ObjectId, ref: 'carts' }]
})

userSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password, 8)
    next()
})

userSchema.plugin(unique_validator,{message:'must be unique'})

const User = mongoose.model('User',userSchema)

module.exports = User