'use strict'

const express = require('express')
const router = express.Router()
const itemController = require('./../controllers/itemController')


router.post('/createOne', itemController.createOne)
router.get('/findAll', itemController.findAll)
router.post('/updateOne/:id', itemController.updateOne)
router.post('/deleteOne/:id', itemController.deleteOne)

module.exports = router