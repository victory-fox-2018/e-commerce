const router = require('express').Router()
const { signupUser, signinUser } = require('../controllers/userController')
const { addItem, allItem, filterItem, getItem } = require('../controllers/itemController')
const { addCategory, allCategory } = require('../controllers/categoryController')
const { add } = require('../controllers/cartController')

// middleware
const auth = require('../middleware/auth')

// user
router.post('/user/signup', signupUser)
router.post('/user/signin', signinUser)

// item
router.post('/item/add', addItem)
router.get('/item/display', allItem)
router.get('/item/filter/:name', filterItem)
router.get('/item/:id', getItem)

// category
router.post('/category/add', addCategory)
router.get('/category/display', allCategory)

// cart
router.post('/cart/add', auth, add)

module.exports = router