const router = require('express').Router();
const { create, read } = require('../controllers/carts');

router.post('/', create);
router.get('/', read);

module.exports = router;