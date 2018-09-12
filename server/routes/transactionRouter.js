'use strict'

const express = require('express')
const router = express.Router()
const transactionController = require('./../controllers/transactionController')


router.post('/createOne', transactionController.createOne)
router.get('/findAll', transactionController.findAll)
router.post('/updateOne/:id', transactionController.updateOne)
router.post('/deleteOne/:id', transactionController.deleteOne)

module.exports = router