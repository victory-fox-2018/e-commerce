const router = require('express').Router()
const isLogin = require('../middlewares/isLogin')
const { getOne } = require('../controllers/userController')

router.get('/', isLogin, getOne)

module.exports = router