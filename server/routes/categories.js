var express = require('express');
var router = express.Router();
var { show, add, edit, remove } = require('../controllers/categories')

router.get('/', show)
router.post('/', add)
router.put('/', edit)
router.delete('/', remove)

module.exports = router;