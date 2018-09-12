const routes = require('express').Router()
const { findAll, filterByCategory, create, update, remove } = require('../controllers/itemController')

routes.get('/', findAll)
routes.get('/categories/:id', filterByCategory)
routes.post('/create', create)
routes.put('/update/:id', update)
routes.delete('/remove/:id', remove)

module.exports = routes