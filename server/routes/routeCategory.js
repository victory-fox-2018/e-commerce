const Router = require('express').Router()
const { createCategory, readCategory, deleteCategory, updateCategory } = require('../controllers/controllerCategory')

Router
    .get('/', readCategory)
    .post('/create', createCategory)
    .put('/update/:id', updateCategory)
    .delete('/delete/:id', deleteCategory)

module.exports = Router