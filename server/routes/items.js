var express = require('express');
var router = express.Router();
var upload = require('../middlewares/upload')
var { getAllItem, getOneItem, createItem, deleteItem } = require('../controllers/items')
/* GET users listing. */
router.get('/', getAllItem)
router.get('/:id', getOneItem)

router.post('/',upload.single('image'),createItem)
router.post('/',)
router.delete('/:id', deleteItem)





module.exports = router;
