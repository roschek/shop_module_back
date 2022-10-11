const Router = require('express')
const brandController = require('../controllers/brandController')
const router = new Router()
const checkRoleMiddleware = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
router.get('/', brandController.getAll)



module.exports = router
