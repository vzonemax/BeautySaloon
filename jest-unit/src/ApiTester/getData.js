const axios = require('axios')
const getData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/saloons/get')
        // console.log(response.data)
        return response.data
    } catch (error) {
        return error
    }
}
module.exports = getData;