const router = require('express').Router()
const { createOne, getAll, updateOne, deleteOne } = require('../controllers/categoryController')

router.post('/', createOne)
router.get('/', getAll)
router.put('/:id', updateOne)
router.delete('/:id', deleteOne)

module.exports = router