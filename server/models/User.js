const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    transaction: [{ type: Schema.Types.ObjectId, ref: 'Transaction'}]
}, {
    timestamps: true
})



const User = mongoose.model('User', userSchema);

module.exports = User