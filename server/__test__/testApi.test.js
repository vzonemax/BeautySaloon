const testApi = require('./testApi')

const expectAuthData = [[{"id":24}],{"fieldCount":0,"affectedRows":0,"insertId":0,"info":"","serverStatus":34,"warningStatus":0,"changedRows":0}]
const autLink = 'http://localhost:5000/api/users/auth/testuser2/111'
const expectStatuses = [{"id":0,"name":"Не подтверждена","description":"Изначальный статус записи, ожидает подтверждения администратором"},{"id":1,"name":"Подтверждена","description":"Подтвержденный статус записи означает подтверждение администратором"},{"id":2,"name":"Выполнена","description":"Статус означает, что услуга успешно выполнилась"},{"id":3,"name":"Не выполнена","description":"Статус означает, что услуга не выполнилась"}]
const statusesLink = 'http://localhost:5000/api/statuses/get/'
const expectMasterServicesData = {"saloon":[{"idSaloon":1,"SaloonName":"МаникюрLine","saloonImage":"http://localhost:5000/manikurLine.png","SaloonDescription":"Маникюрня \"МаникюрЛайн\" - любимое место для ваших пальчиков!"}],"masters":[{"id":1,"name":"Алиса Серая","description":"Старший мастер маникюра","workTimeStart":9,"workTimeEnd":18,"workDates":"1,2,3,4,5","userImage":"http://localhost:5000/alice.jpg","services":[{"idService":1,"ServiceTime":1800000,"Price":20,"idServiceType":1,"ServiceName":"Маникюр"},{"idService":2,"ServiceTime":9000000,"Price":50,"idServiceType":2,"ServiceName":"Маникюр + покрытие"}]},{"id":2,"name":"Анастасия Крош","description":"Младший мастер маникюра","workTimeStart":18,"workTimeEnd":21,"workDates":"1,2,3,4,5","userImage":"http://localhost:5000/madon.jpg","services":[{"idService":3,"ServiceTime":1800000,"Price":10,"idServiceType":1,"ServiceName":"Маникюр"}]}]}
const masterServicesLink = 'http://localhost:5000/api/services/get/1'

test("check auth api", async () => {
    expect(await testApi(autLink)).toEqual(expectAuthData)
})
test("check statuses", async () => {
    expect(await testApi(statusesLink)).toEqual(expectStatuses)
})
test("check saloon master services", async () => {
    expect(await testApi(masterServicesLink)).toEqual(expectMasterServicesData)
})
