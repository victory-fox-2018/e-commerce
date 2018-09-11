var express = require('express');
var router = express.Router();
var { getAllItem, getOneItem, createItem, deleteItem } = require('../controllers/items')
/* GET users listing. */
router.get('/', getAllItem)
router.get('/:id', getOneItem)

router.post('/', createItem)
router.post('/:id', deleteItem)




module.exports = router;
