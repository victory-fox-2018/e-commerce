const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:   {
    type: String,
  },
  gender: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address : {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
  listTransaction : [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
    timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User