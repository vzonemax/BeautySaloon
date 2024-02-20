const Router = require("express");
const dbConnector = require("../dataConnector/dbConnector");
const router = new Router()

router.all('/order/:login/:pass/:serviceId/:date/:description', async (req, res) => {
    // console.log((`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))
    const userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    console.log(userId[0].id)
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    const postResult = (await dbConnector(`call beautysaloon.order_by_userId_serviceId_date_description(${userId[0].id}, ${req.params["serviceId"]}, ${req.params["date"]}, '${req.params["description"]}');`))
    console.log(postResult)
    res.json({ status: postResult.affectedRows, description: "Запись на услугу офромлена. Ожидайте подтверждения." })
})

router.get('/get/:day/:master', async (req, res) => {
    let curDate = new Date()
    let valDate = new Date(+req.params["day"])
    if ((valDate.getDate() === curDate.getDate()) && (valDate.getMonth() === curDate.getMonth())) {
        // if (new Date().getTime() === new Date(req.params["day"]).getTime()) {
        res.json({
            "From": new Date().getTime(),
            "TO": +req.params["day"] + 3600 * 24 * 1000,
            "Master": req.params["master"]
        })
        return
    }
    console.log(req.params["day"], req.params["master"])
    res.json({
        "From": req.params["day"],
        "TO": +req.params["day"] + 3600 * 24 * 1000,
        "Master": req.params["master"]
    })
    // let responseVal = (await dbConnector(``)) 
    // const responseObj = { "saloon": {}, "masters": [] }
    // responseObj.saloon = (await dbConnector(`call beautysaloon.get_saloon_by_id(${req.params["saloonId"]});`))[0]
    // responseObj.masters = (await dbConnector(`call beautysaloon.get_masters_by_saloonid(${req.params["saloonId"]});`))[0]
})

router.get('/getClientOrders/:login/:pass', async (req, res) => {
    const userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    console.log(userId[0])
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    const response = (await dbConnector(`call beautysaloon.get_my_orders_by_id(${userId[0].id});`))[0]
    res.json(response)
})

router.get('/getSaloonOrders/:login/:pass', async (req, res) => {
    const userRole = (await dbConnector(`call beautysaloon.get_user_role_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    console.log(userRole[0])
    if (userRole.length === 0 || userRole[0].role == 0) {
        res.json({ status: 0, description: "Вы не авторизированы или у вас недостаточно прав" })
        return
    }
    if (userRole[0].role == 2) {
        const response = (await dbConnector(`call beautysaloon.get_saloon_orders_by_user_id(${userRole[0].id});`))[0]
        res.json(response)
    } else {
        const response = (await dbConnector(`call beautysaloon.get_my_services_by_id(${userRole[0].id});`))[0]
        res.json(response)
    }
})

router.all('/dellOrder/:login/:pass/:orderId/', async (req, res) => {
    const userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    console.log("userId", userId[0])
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    console.log(`call beautysaloon.get_idAdmin_by_orderId_userId('${req.params["orderId"]}','${userId[0].id}');`)
    const adminId = (await dbConnector(`call beautysaloon.get_idAdmin_by_orderId_userId('${req.params["orderId"]}','${userId[0].id}');`))[0]
    console.log("adminId", adminId[0])
    if (adminId.length === 0) {
        res.json({ status: 0, description: "Вы не обладаете достаточными правами" })
        return
    }
    responseObj = (await dbConnector(`call dell_order_by_id(${req.params["orderId"]});`))
    res.json({ status: await responseObj.serverStatus, description: "Успешно!" })
    return
})

module.exports = router