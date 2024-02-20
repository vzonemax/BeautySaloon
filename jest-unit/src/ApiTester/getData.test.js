// const axios = require('axios')
const getData = require('./getData')
const dbConnector = require('../../../server/dataConnector/dbConnector')

// jest.mock('axios')

let expectData = [{ "idSaloon": 1, "SaloonName": "МаникюрLine", "SaloonDescription": "Маникюрня \"МаникюрЛайн\" - любимое место для ваших пальчиков!", "saloonImage": "http://localhost:5000/manikurLine.png" }, { "idSaloon": 2, "SaloonName": "Hair Studio", "SaloonDescription": "Лучшие профессионалы города Угрюмск сделают ваши волосы неотразимыми!", "saloonImage": "http://localhost:5000/HairStudio.png" }]

test("check dbConnector", async () => {
    expect(await dbConnector("SELECT * FROM beautysaloon.view_saloons;")).toEqual(expectData)
})

// test("checkData", async () => {
//     expect(await getData()).toEqual(expectData)
// })
