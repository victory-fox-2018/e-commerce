const express = require('express');
const router = express.Router();
const itemCatController = require('../controller/itemCat')


router.get('/', itemCatController.getItemCat)
router.post('/', itemCatController.create)
router.put('/:id', itemCatController.update)
router.delete('/:id', itemCatController.remove)


module.exports = router;