const router = require('express').Router()
const { signup, signin } = require('../controllers/userController') 
const category = require('./categoryRoute')
const product = require('./productRoute')
const user = require('./userRoute')
const transaction = require('./transactionRoute')

router.post('/signup', signup)
router.post('/signin', signin)

router.use('/category', category)
router.use('/products', product)
router.use('/users', user)
router.use('/transaction', transaction)

router.get('/', function(req, res, next) {
  res.send('<h1>Halo Asrul Harahap</h1><br /> <p> Web Api</p>')
})

module.exports = router