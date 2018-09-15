require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose'); 

const categoryRoute = require('./routes/categories');
const itemRoute = require('./routes/items');
const customerRoute = require('./routes/customers');
const cartRoute = require('./routes/carts');

// mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useNewUrlParser: true }); 
// mongoose.connect('mongodb://imam:imam82@ds151382.mlab.com:51382/shopping-cart', {useNewUrlParser: true});

server
  .use(cors())
  .use(express.urlencoded({extended: true}))
  .use(express.json())
  .use(express.static('assets'))

server
  .use('/categories', categoryRoute)
  .use('/items', itemRoute)
  .use('/customers/', customerRoute)
  .use('/carts', cartRoute)
  
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${process.env.PORT || 3000}`)
});
