const router = require('express').Router();
const { create } = require('../controllers/cart');

router.post('/checkout', create);

module.exports = router;