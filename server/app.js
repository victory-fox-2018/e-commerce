require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/')
const app = express();
const port = process.env.PORT || 3000
const db = mongoose.connection
// mongoose.connect('mongodb://admin:admin1@ds251622.mlab.com:51622/e-commerce-portfolio');
mongoose.connect('mongodb://localhost:27017/e-commerce')
db.on('err', console.error.bind(console, 'connection error:'))
db.once('open', function(){
    console.log(`Database Connected`)
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use('/',routes)


app.listen(port,function(){
    console.log(`Listening on Port ${port}`)
})