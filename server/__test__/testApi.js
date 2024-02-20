const axios = require('axios')
const testApi = async (URL) => {
    try {
        const response = await axios.get(URL)
        return response.data
    } catch (error) {
        return error
    }
}
module.exports = testApi