const Router = require("express");
const dbConnector = require("../dataConnector/dbConnector");
const router = new Router()

const multer = require('multer')
let storage = multer.diskStorage({
    destination: './staticData',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
router.post('/loadImage/:userId', upload.single('image'), async (req, res, next) => {
    const response = (await dbConnector(`call set_photo_by_imagePath_userId('http://localhost:5000/${req.file.filename}',${req.params["userId"]})`))
    console.log(req.file)
    res.json("Успешно")
})

router.get('/get/:login/:pass', async (req, res) => {
    const response = (await dbConnector(`call beautysaloon.get_user_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))
    res.json(response)
})
router.get('/auth/:login/:pass', async (req, res) => {
    const response = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))
    res.json(response)
})
router.all('/setLogin/:login/:pass/:newLogin', async (req, res) => {
    const responseId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (responseId.length === 0) {
        res.json({ description: "Выполните вход повторно и повторите действия" })
        return
    }
    const userId = responseId[0].id
    try {
        const response = (await dbConnector(`call beautysaloon.set_login_by_userId(${userId}, '${req.params["newLogin"]}');`))[0]
        res.json({ description: "Успешно! Для продолжения необходимо выполнить заново вход в аккаунт." })
    } catch (error) {
        res.json({ description: "Выполните вход повторно и повторите действия" })
    }
})
router.all('/setPass/:login/:pass/:newPass', async (req, res) => {
    const responseId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (responseId.length === 0) {
        res.json({ description: "Выполните вход повторно и повторите действия" })
        return
    }
    const userId = responseId[0].id
    try {
        const response = (await dbConnector(`call beautysaloon.set_pass_by_userId(${userId}, '${req.params["newPass"]}');`))[0]
        res.json({ description: "Успешно! Для продолжения необходимо выполнить заново вход в аккаунт." })
    } catch (error) {
        res.json({ description: "Выполните вход повторно и повторите действия" })
    }
})
router.all('/setNumber/:login/:pass/:newNumber', async (req, res) => {
    const responseId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (responseId.length === 0) {
        res.json({ description: "Выполните вход повторно и повторите действия" })
        return
    }
    const userId = responseId[0].id
    try {
        const response = (await dbConnector(`call beautysaloon.set_number_by_userId(${userId}, '${req.params["newNumber"]}');`))[0]
        res.json({ description: "Успешно! Для продолжения необходимо выполнить заново вход в аккаунт." })
    } catch (error) {
        res.json({ description: "Выполните вход повторно и повторите действия" })
    }
})
router.all('/setName/:login/:pass/:newName', async (req, res) => {
    const responseId = (await dbConnector(`call beautysaloon.get_userId_by_login_pass('${req.params["login"]}', '${req.params["pass"]}');`))[0]
    if (responseId.length === 0) {
        res.json({ description: "Выполните вход повторно и повторите действия" })
        return
    }
    const userId = responseId[0].id
    try {
        const response = (await dbConnector(`call beautysaloon.set_name_by_userId(${userId}, '${req.params["newName"]}');`))[0]
        res.json({ description: "Успешно! Для продолжения необходимо выполнить заново вход в аккаунт." })
    } catch (error) {
        res.json({ description: "Выполните вход повторно и повторите действия" })
    }
})
router.all('/registration/:login/:name/:number/:pass/', async (req, res) => {
    const responseId = (await dbConnector(`call get_userId_by_login_number('${req.params["login"]}', '${req.params["number"]}');`))[0]
    if (responseId.length !== 0) {
        res.json({ description: "Пользователь с таким номером телефона или логином зарегестрирован" })
        return
    }
    let result = { status: 1, description: "В процессе обработки!" }
    try {
        const response = (await dbConnector(`call set_new_acc_by_login_name_number_pass('${req.params["login"]}','${req.params["pass"]}','${req.params["number"]}','${req.params["name"]}')`))
    } catch (error) {
        result = { status: 2, description: "Ошибка! Проверьте входные данные" }
    } finally {
        result = { status: 0, description: "Успешно! Вы будете перенаправлены на страницу авторизации!" }
    }
    res.json(result)
})
module.exports = router