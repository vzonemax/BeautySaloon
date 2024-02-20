const dbConnector = require('./dbConnector')
const expectData = [{ "idSaloon": 1, "SaloonName": "МаникюрLine", "SaloonDescription": "Маникюрня \"МаникюрЛайн\" - любимое место для ваших пальчиков!", "saloonImage": "http://localhost:5000/manikurLine.png" }, { "idSaloon": 2, "SaloonName": "Hair Studio", "SaloonDescription": "Лучшие профессионалы города Угрюмск сделают ваши волосы неотразимыми!", "saloonImage": "http://localhost:5000/HairStudio.png" }]
const testQuery = "SELECT * FROM beautysaloon.view_saloons;"
test("check dbConnector", async () => {
    expect(await dbConnector(testQuery)).toEqual(expectData)
})