const Router = require("express");
const dbConnector = require("../dataConnector/dbConnector");
const router = new Router()
router.get('/get/:saloonId', async (req, res) => {

    const responseObj = { "saloon": {}, "masters": [] }
    responseObj.saloon = (await dbConnector(`call beautysaloon.get_saloon_by_id(${req.params["saloonId"]});`))[0]
    responseObj.masters = (await dbConnector(`call beautysaloon.get_masters_by_saloonid(${req.params["saloonId"]});`))[0]
    await Promise.all(responseObj.masters.map(async (val, j) => {
        responseObj.masters[j].services = (await dbConnector(`call beautysaloon.get_service_by_masterId(${val.id});`))[0]
    }))
    res.json(await responseObj)

})

router.all('/dellService/:login/:pass/:serviceId/:saloonId', async (req, res) => {
    const userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    let response = (await dbConnector(`call beautysaloon.get_idAdmin_by_userId_saloonId(${userId[0].id}, ${req.params["saloonId"]});`))[0]
 
    if (response.length === 0) {
        res.json({ status: 0, description: "У вас недостаточно прав" })
        return
    }
    response = (await dbConnector(`call dell_service_by_serviceId(${req.params["serviceId"]})`))
    if (response.length !== 0) {
        res.json({ status: 1, description: "Услуга успешно удалена!" })
        return
    }
})

router.all('/addService/:login/:pass/:saloonId/:masterId/:serviceName/:time/:price', async (req, res) => {
    const userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    let response = (await dbConnector(`call beautysaloon.get_idAdmin_by_userId_saloonId(${userId[0].id}, ${req.params["saloonId"]});`))[0]
 
    if (response.length === 0) {
        res.json({ status: 0, description: "У вас недостаточно прав" })
        return
    }
    
    response = (await dbConnector(`call beautysaloon.get_serviceTypeId_by_serviceName('${req.params["serviceName"]}')`))[0]
    if (response.length === 0) {
        (await dbConnector(`call set_serviceType_by_name('${req.params["serviceName"]}')`))
        response = (await dbConnector(`call beautysaloon.get_serviceTypeId_by_serviceName('${req.params["serviceName"]}')`))[0]
    }
    
    response = (await dbConnector(`call beautysaloon.set_service_by_masterId_serviceId_workTime_price(${req.params["masterId"]}, ${response[0].id}, ${req.params["time"]}, ${req.params["price"]});`))
    if (response.warningStatus !== 0) {
        console.log(response.info)
        res.json(response.info)
        return
    }
    res.json({"status":0, description:"Вы успешно добавили услугу! Страница обновиться, чтобы увидеть изменения!"})
})

module.exports = router