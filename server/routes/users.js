var express = require('express');
var router = express.Router();
var { show, add, edit, remove, login, register, checkout} = require('../controllers/users')
var { isLogin } = require('../middlewares/isLogin')

router.get('/', show)
router.post('/', add)
router.put('/', edit)
router.delete('/', remove)
router.post('/login', login)
router.post('/register', register)
router.post('/checklogin', isLogin, (req, res) => {res.status(200).json({isLogin: true})})
router.post('/checkout', isLogin, checkout)

module.exports = router;