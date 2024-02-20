const Router = require("express");
const dbConnector = require("../dataConnector/dbConnector");
const router = new Router()

router.get('/get', async (req, res) => {
    res.json( await dbConnector("SELECT * FROM beautysaloon.view_saloons;"))
})

router.get('/getAdminAccess/:login/:pass/:saloonId', async (req, res) => {
    const userId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (userId.length === 0) {
        res.json({ status: 0, description: "Вы не авторизированы" })
        return
    }
    const response = (await dbConnector(`call beautysaloon.get_idAdmin_by_userId_saloonId(${userId[0].id}, ${req.params["saloonId"]});`))[0]
    if (response.length !== 0) {
        res.json({ status: 1, description: "Права подтверждены" })
        return
    } else {
        res.json({ status: 0, description: "У вас недостаточно прав" })
        return
    }
})

module.exports = router