const router = require('express').Router();
const { findAll, findById, create, update, remove } = require('../controllers/category');

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;