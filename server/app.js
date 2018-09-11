var express = require('express');
var app = express();
const mongoose = require('mongoose')
const users = require('./routes/users')


mongoose.connect('mongodb://localhost:27017/shopping-cart',{useNewUrlParser:true});
mongoose.set('useCreateIndex', true)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected')
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users',users)

module.exports = app;
