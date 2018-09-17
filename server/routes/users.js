var express = require('express');
var router = express.Router();
var { show, add, edit, remove, login, register, checkLocalStorage } = require('../controllers/users')

router.get('/', show)
router.post('/', add)
router.put('/', edit)
router.delete('/', remove)
router.post('/login', login)
router.post('/register', register)
router.post('/checklocalstorage', checkLocalStorage)

module.exports = router;