const Router = require('express')
const typeController = require('../controllers/typeController')
const router = new Router()
const checkRoleMiddleware = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), typeController.create)
router.get('/', typeController.getAll)



module.exports = router
