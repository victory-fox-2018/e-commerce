const router = require('express').Router();
const { signup, signin } = require('../controllers/customer');

// router.get('/', findAll);
// router.get('/:id', findById);
router.post('/signup', signup);
router.post('/signin', signin);
// router.put('/:id', update);
// router.delete('/:id', remove);

module.exports = router;