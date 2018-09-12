const router = require('express').Router();
const { signin, signup, read, update, remove } = require('../controllers/customers');

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/', read);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router; 