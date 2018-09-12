const express = require('express');
const router = express.Router();
const userController = require('../controller/user')
const {auth} = require('../middleware/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('INI API USERS')
});

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/:id', auth, userController.findById)
router.put('/:id', auth, userController.update)
router.delete('/:id', auth, userController.remove)

router.patch('/cart/:idItem', auth, userController.addCart)
router.patch('/checkout/:idUser', auth, userController.checkout)

module.exports = router;