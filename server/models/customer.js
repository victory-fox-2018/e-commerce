const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill customer name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please fill customer email']
  },
  password: {
    type: String,
    required: [true, 'Please fill customer passsword']
  },
  loginType: {
    type: String,
    required: [true, 'Please fill customer login type']
  }
}, {
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;