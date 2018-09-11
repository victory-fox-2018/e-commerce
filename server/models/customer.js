const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please fill customer name']
  },
  email: {
    type: String,
    required: [true, 'Please fill customer email'],
    unique: 'This email has been used'
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

customerSchema.plugin(beautifyUnique);

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;