const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        require: 'Please input your name'
    },

    email: {
        type: String,
        require: 'Please input your Email',
        unique: true,
        validate: {
            validator: (value) => {
                let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(value);
            }
        }
    },

    password: {
        type: String,
        require: `Please input your Password`,
        validate: {
            validator: (value) => {
                let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
                return regex.test(value);
            }
        }
    },

    itemId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
    
}, { timestamp: true })


module.exports = mongoose.model('User', userSchema)
