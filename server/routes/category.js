const router = require('express').Router();
const { findAll, findById, create } = require('../controllers/category');

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);

module.exports = router;