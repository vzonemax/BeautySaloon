const validateAge = require('../ValidateAge/validateAge')
test("test 18 age", () => {
    expect(validateAge(18)).toBe(true)
})