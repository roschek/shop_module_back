const Router = require('express')
const itemController = require('../controllers/itemController')
const router = new Router()
const checkRoleMiddleware = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), itemController.create)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getItem)



module.exports = router
