const express = require('express');
const router = express.Router();
const itemCatController = require('../controller/itemCat')
const {auth} = require('../middleware/auth')


router.get('/', itemCatController.getItemCat)
router.post('/', auth, itemCatController.create)
router.put('/:id', auth, itemCatController.update)
router.delete('/:id', auth, itemCatController.remove)
router.get('/:name', itemCatController.findByName)


module.exports = router;