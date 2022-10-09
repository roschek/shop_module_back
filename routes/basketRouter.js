const Router = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()

router.post('/', basketController.login)
router.get('/', basketController.login)



module.exports = router
