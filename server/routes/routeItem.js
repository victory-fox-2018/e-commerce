const Router = require('express').Router()
const { createItem, readItem, updateItem, deleteItem } = require('../controllers/controllerItem')

Router.get('/', readItem)
Router.post('/create', createItem)
Router.put('/update/:id', updateItem)
Router.delete('/remove/:id', deleteItem)

module.exports = Router