const router = require('express').Router()
const { createOne, getAll, updateOne, deleteOne, getAllLike, getAllPriceGT, getAllPriceLT } = require('../controllers/productController')

router.post('/', createOne)
router.get('/', getAll)
router.put('/:id', updateOne)
router.delete('/:id', deleteOne)
router.get('/like/:like', getAllLike)
router.get('/pricegt/:price', getAllPriceGT)
router.get('/pricelt/:price', getAllPriceLT)

module.exports = router