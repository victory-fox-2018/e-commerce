const routes = require('express').Router()
const { signup, signin, update, remove } = require('../controllers/userController')
const { auth } = require('../middleware')

routes.post('/signup', signup)
routes.post('/signin', signin)
routes.put('/update/:id', auth, update)
routes.delete('/remove/:id', auth, remove)

module.exports = routes