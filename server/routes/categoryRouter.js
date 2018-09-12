'use strict'

const express = require('express')
const router = express.Router()
const categoryController = require('./../controllers/categoryController')


router.post('/createOne', categoryController.createOne)
router.get('/findAll', categoryController.findAll)
router.post('/updateOne/:id', categoryController.updateOne)
router.post('/deleteOne/:id', categoryController.deleteOne)

module.exports = router