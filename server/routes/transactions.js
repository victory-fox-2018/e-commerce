var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var { addTransaction, deleteTransaction, getAllTransaction, getOneTransaction } = require('../controllers/transactions')
/* GET home page. */
router.get('/', authentication,getAllTransaction)

router.post('/', authentication ,addTransaction)

module.exports = router;
