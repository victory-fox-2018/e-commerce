const Router = require('express').Router()
const { createUser, readUser, updateUser, deleteUser, findAllUser } = require('../controllers/controllerUser')

Router.post('/login', readUser)
Router.post('/register', createUser)
Router.put('/update/:id', updateUser)
Router.delete('/remove/:id', deleteUser)
Router.get('/', findAllUser )

module.exports = Router