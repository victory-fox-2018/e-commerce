const routes = require('express').Router()
const routesUser = require('./user')
const routesCategory = require('./category')
const routesItem = require('./item')
const routesTransaction = require('./transaction')

routes.use('/users', routesUser)
routes.use('/categories', routesCategory)
routes.use('/items', routesItem)
routes.use('/transactions', routesTransaction)

module.exports = routes