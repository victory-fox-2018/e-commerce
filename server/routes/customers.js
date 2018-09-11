const router = require('express').Router();
const { create, read, update, remove } = require('../controllers/customers');

router.post('/', create);
router.get('/', read);

module.exports = router; 