require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require("./routes/index")
const path = require('path')
const PORT = process.env.SERVER_PORT || 5000
const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'staticData')))
app.use('/api', router)
const start = () => {
    try {
        app.listen(PORT, () => console.log("server was started on port: " + PORT))
    } catch (error) {
        console.log(error)
    }
}
start()