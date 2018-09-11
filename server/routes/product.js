const router = require('express').Router();
const { findAll, create } = require('../controllers/product');

router.get('/', findAll);
router.post('/', create);
// router.get('/:id', findById);
// router.put('/:id', update);
// router.delete('/:id', remove);

module.exports = router;