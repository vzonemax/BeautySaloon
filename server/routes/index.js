const Router = require("express")
const router = new Router()
const usersRouter = require("./usersRouter")
const servicesRouter = require("./servicesRouter")
const saloonsRouter = require("./saloonsRouter")
const ordersRouter = require("./ordersRouter")
const mastersRouter = require("./mastersRouter")
const statusesRouter = require("./statusesRouter")

router.use('/users', usersRouter)
router.use('/services', servicesRouter)
router.use('/saloons', saloonsRouter)
router.use('/orders', ordersRouter)
router.use('/masters', mastersRouter)
router.use('/statuses', statusesRouter)

module.exports = router