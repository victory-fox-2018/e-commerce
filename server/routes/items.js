const router = require('express').Router();
const { create, read, update, remove, filter, search } = require('../controllers/items');

router.post('/', create);
router.get('/', read);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/:categoryId', filter);
router.post('/search', search);

module.exports = router; 