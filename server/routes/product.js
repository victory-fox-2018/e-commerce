const router = require('express').Router();
const { findAll, findAllwithCategory, create } = require('../controllers/product');

router.get('/', findAll);
router.get('/category/:id', findAllwithCategory);
router.post('/', create);
// router.get('/:id', findById);
// router.put('/:id', update);
// router.delete('/:id', remove);

module.exports = router;