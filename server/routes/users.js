const router = require('express').Router()
const { register, update, get_user, delete_user } = require('../controllers/user-controller')

router.post('/',register)

router.put('/:id',update)

router.get('/',get_user)

router.delete('/:id',delete_user)

module.exports = router
