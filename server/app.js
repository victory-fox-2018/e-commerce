const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()

const RouterUser = require('./routes/routeUser')
const RouterItem = require('./routes/routeItem')
const RouterCategory = require('./routes/routeCategory')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/e-commerceDB', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log(`Data base mongoose is running`);
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', RouterUser)
app.use('/items', RouterItem)
app.use('/category', RouterCategory)


app.listen(port, () => console.log(`Server running at Port ${port}`))