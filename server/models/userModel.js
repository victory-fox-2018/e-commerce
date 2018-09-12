const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    isUsingFacebook: {
        type: Number,
        default: 0
    }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema)
module.exports = User