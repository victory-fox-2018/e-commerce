const routes = require('express').Router()
const { create } = require('../controllers/transactionController')

routes.use('/create', create)

module.exports = routes