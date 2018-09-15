const router = require('express').Router();
const { create, read, update, remove, filter } = require('../controllers/items');

router.post('/', create);
router.get('/', read);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/:categoryId', filter)

module.exports = router; 