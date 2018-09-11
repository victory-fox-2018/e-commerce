const express = require('express');
const router = express.Router();
const itemController = require('../controller/item')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('INI API ITEMS')
});


module.exports = router;