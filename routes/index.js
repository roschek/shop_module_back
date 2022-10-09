const Router = require('express')
const router = new Router()
const itemRouter = require('./itemRouter')
const brandRouter = require('./brandRouter')
const basketRouter = require('./basketRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/item', itemRouter)
router.use('/basket', basketRouter)


module.exports = router
