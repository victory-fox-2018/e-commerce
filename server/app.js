require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const categoryRoutes = require('./routes/category');
const customerRoutes = require('./routes/customer');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/shopping-cart', { useNewUrlParser: true });
// mongoose.connect('mongodb://35.240.240.122/shopping-cart', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to mongooese...'));

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.listen(process.env.PORT || '3000', () => console.log('Connected to server...'));