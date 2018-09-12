'use strict'

const express = require('express')
const router = express.Router()

const user = require('./userRouter')
const category = require('./categoryRouter')
const item = require('./itemRouter')
const transaction = require('./transactionRouter')

router.use('/user', user)
router.use('/category', category)
router.use('/item', item)
router.use('/transaction', transaction)

// router.get('/', function(req, res){
//     res.redirect('/api')
// })

module.exports = router