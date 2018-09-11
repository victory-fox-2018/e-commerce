const router = require('express').Router();
const { signup, signin, checklogin } = require('../controllers/customer');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/checklogin', checklogin);

module.exports = router;