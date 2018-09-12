const hash = require('../helpers/hashHelper')
const sgMail = require('@sendgrid/mail')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    name: String,
    email: {
        type: String,
        unique : true,
        required: [true, 'Please input email'],
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        validate: {
            validator: function(v) {
                if(v.length <= 6) return false
                return true
            }
        }
    },
    role: { type: String, default: 'member' },
    deleteAt: { type: Date, default: null},    
}, { timestamps:true });

userSchema.post('validate', function() {
    this.password = hash.bcencode(this.password)
});

userSchema.post('save', function() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: this.email,
        from: 'talkasrul@gmail.com',
        subject: 'Thank For Register',
        text: 'Thanks for register',
        html: '<strong>Thanks for register</strong>',
    }
    sgMail.send(msg)
});

const User = mongoose.model('User', userSchema);
module.exports = User

// By Asrul Harahap - 2018