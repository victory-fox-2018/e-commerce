const router = require('express').Router()
const { createTransaction, getTransaction } = require('../controllers/transactionController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, createTransaction)
router.get('/', isLogin, getTransaction)

module.exports = router