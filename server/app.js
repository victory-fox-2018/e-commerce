const express =require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const index = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cors())

mongoose.connect('mongodb://localhost/ecommerce-db', { useNewUrlParser: true });

app.use('/', index)

app.listen(3000, ()=> console.log('listening on port 3000'))