const Router = require('express').Router()
const { createUser, readUser, updateUser, deleteUser } = require('../controllers/controllerUser')

Router.post('/login', readUser)
Router.post('/signin', createUser)
Router.put('/update/:id', updateUser)
Router.delete('/remove/:id', deleteUser)

module.exports = Router