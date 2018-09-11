const express = require('express');
const router = express.Router();
const itemController = require('../controller/item')

/* GET users listing. */
router.get('/', itemController.getItems)


module.exports = router;