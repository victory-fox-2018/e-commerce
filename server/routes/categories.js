const router = require('express').Router();
const { create, read, update, remove } = require('../controllers/categories');

router.post('/', create);
router.get('/', read);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;