var express = require('express');
var router = express.Router();
var { show, add, edit, remove, checkLogin, register, checkLoginFB, checkLocalStorage } = require('../controllers/users')

router.get('/', show)
router.post('/', add)
router.put('/', edit)
router.delete('/', remove)
router.post('/login', checkLogin)
router.post('/register', register)
router.post('/loginfb', checkLoginFB)
router.post('/checklocalstorage', checkLocalStorage)

module.exports = router;