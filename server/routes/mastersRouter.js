const Router = require("express");
const dbConnector = require("../dataConnector/dbConnector");
const router = new Router()


router.all('/setNewMaster/:login/:pass/:saloonId/:masterLogin/:workTimeStart/:workTimeEnd/:description/:workDates', async (req, res) => {
    let userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    let response = (await dbConnector(`call beautysaloon.get_idAdmin_by_userId_saloonId(${userId[0].id}, ${req.params["saloonId"]});`))[0]
    if (response.length === 0) {
        res.json({ status: 0, description: "У вас недостаточно прав" })
        return
    }
    userId = (await dbConnector(`call beautysaloon.get_userId_by_login('${req.params["masterLogin"]}');`))[0]
    if (userId.length === 0) {
        res.json({ status: 0, description: "Пользовавтель с таким логином не найден. Логин можно найти на странице аккаунта мастера." })
        return
    }
    response = (await dbConnector(`call beautysaloon.set_new_master(${req.params["saloonId"]}, ${userId[0].id}, ${req.params["workTimeStart"]}, ${req.params["workTimeEnd"]},  '${req.params["description"]}', '${req.params["workDates"]}');`))
    // call beautysaloon.set_new_master(2, 1, 6, 12, 'Старший парикмахер', '1,3,5,0');
    res.json({status:response.serverStatus, description:"Успешно!"})
})

router.all('/dellMaster/:login/:pass/:saloonId/:userId', async (req, res) => {
    let userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    let response = (await dbConnector(`call beautysaloon.get_idAdmin_by_userId_saloonId(${userId[0].id}, ${req.params["saloonId"]});`))[0]
    if (response.length === 0) {
        res.json({ status: 0, description: "У вас недостаточно прав" })
        return
    }
    response = (await dbConnector(`call beautysaloon.dell_master_by_id(${req.params["userId"]});`))
    res.json({status:response.serverStatus, description:"Успешно!"})
})

router.get('/getFreeTime/:master/:service/:day', async (req, res) => {

    // 1) getAllOrders from DB by masterId, serviceId, dayStart, dayEnd
    const startValueDay = new Date(+req.params["day"])
    const masterId = +req.params["master"]
    const serviceId = +req.params["service"]

    let responseWorkTime = (await dbConnector(`call get_workTime_by_master(${masterId});`))[0]
    responseWorkTime[0].workTimeStart = (responseWorkTime[0].workTimeStart * 1000 * 3600)
    responseWorkTime[0].workTimeEnd = (responseWorkTime[0].workTimeEnd * 1000 * 3600)
    // console.log("Время работы мастера", responseWorkTime)

    const endValueDay = new Date(startValueDay.getFullYear(), startValueDay.getMonth(), startValueDay.getDate() + 1, 0)

    // console.log("between", startValueDay.getTime(), endValueDay.getTime())

    let responseOrders = (await dbConnector(`call get_orders_by_date_master(${startValueDay.getTime()}, ${endValueDay.getTime()}, ${masterId});`))[0]
    if (responseOrders.length !== 0) {
        console.log("allorders", responseOrders)
        // console.log("Записи уже есть:", responseOrders)
        // res.json(responseOrders)
    } else {
        // console.log("Записей на выбранную дату нет")
        // res.json("Записей на выбранную дату нет")
    }


    let serviceTime = (await dbConnector(`call beautysaloon.get_serviceTime_by_service_id(${serviceId});`))[0][0].serviceTime
    // console.log("Длительность услуги:", serviceTime)

    let startFreeTime = []
    const currentDay = new Date()
    if ((startValueDay.getTime() + responseWorkTime[0].workTimeStart) > (currentDay.getTime())) {
        startFreeTime.push({ "start": (startValueDay.getTime() + responseWorkTime[0].workTimeStart) })
    } else {
        // val.OrderTime = new Date().getTime() + 1000 * 3600 * 5
        startFreeTime.push({ "start": new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), currentDay.getHours() + 1).getTime() })
    }
    responseOrders.forEach((val) => {
        startFreeTime[0].start >= (+val.OrderTime + val.WorkTime)
            ? null
            : startFreeTime.push({ "start": (+val.OrderTime + val.WorkTime) })
    })
    console.log("Start", startFreeTime)
    let endFreeTime = []
    responseOrders.forEach((val) => {
        startFreeTime[0].start > (+val.OrderTime)
            ? null
            : endFreeTime.push({ "end": (+val.OrderTime) })
    })
    endFreeTime.push({ "end": (responseWorkTime[0].workTimeEnd + startValueDay.getTime() - serviceTime) })
    console.log("fin:", endFreeTime)

    let result = []
    startFreeTime.forEach((val, i) => {
        //   console.log(startFreeTime[i])
        //   console.log(endFreeTime[i])
        for (let j = startFreeTime[i].start; j < endFreeTime[i].end; j += 3600 * 1000 * 0.5) { //serviceTime) {
            if (j + serviceTime > endFreeTime[i].end) {
                break;
            }
            result.push(j)
        }
    })
    res.json(result)
})

module.exports = router