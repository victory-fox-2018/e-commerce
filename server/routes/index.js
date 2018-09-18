const router = require('express').Router()
const { signupUser, signinUser } = require('../controllers/userController')
const { addItem, allItem, filterItem } = require('../controllers/itemController')
const { addCategory, allCategory } = require('../controllers/categoryController')

// user
router.post('/user/signup', signupUser)
router.post('/user/signin', signinUser)

// item
router.post('/item/add', addItem)
router.get('/item/display', allItem)
router.get('/item/filter/:name', filterItem)

// category
router.post('/category/add', addCategory)
router.get('/category/display', allCategory)

module.exports = router