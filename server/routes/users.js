const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('INI API USERS')
});

router.post('/register', userController.register)

router.post('/login', userController.login)

module.exports = router;