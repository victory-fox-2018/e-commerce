const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  phone: String
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;