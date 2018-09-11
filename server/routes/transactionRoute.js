const router = require('express').Router();
const { showAll, create, erase } = require('../controllers/transactionController');

router.get('/', showAll);
router.post('/', create);
router.delete('/', erase);
// router.patch('/', edit);


module.exports = router;