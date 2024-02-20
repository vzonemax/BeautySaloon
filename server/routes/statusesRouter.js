const Router = require("express");
const dbConnector = require("../dataConnector/dbConnector");
const router = new Router()

router.get('/get/', async (req, res) => {
    responseObj = (await dbConnector(`SELECT * FROM beautysaloon.view_all_statuses;`))
    res.json(await responseObj)
})

router.all('/setStatus/:login/:pass/:orderId/:newStatus', async (req, res) => {
    const userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    console.log("userId",userId[0])
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    console.log(`call beautysaloon.get_idAdmin_by_orderId_userId('${req.params["orderId"]}','${userId[0].id}');`)
    const adminId = (await dbConnector(`call beautysaloon.get_idAdmin_by_orderId_userId('${req.params["orderId"]}','${userId[0].id}');`))[0]
    console.log("adminId",adminId[0])
    if (adminId.length === 0) {
        res.json({ status: 0, description: "Вы не обладаете достаточными правами" })
        return
    }
    responseObj = (await dbConnector(`call set_status_by_order_id(${req.params["orderId"]}, ${req.params["newStatus"]});`))
    res.json({status: await responseObj.serverStatus, description: "Успешно!"})
    return
})

module.exports = router