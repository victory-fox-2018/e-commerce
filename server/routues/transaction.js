const routes = require('express').Router()
const { create } = require('../controllers/transactionController')
const { auth } = require('../middleware')

routes.use('/create', auth, create)

module.exports = routes