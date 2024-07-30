const mongoose = require('mongoose')
const config = require('./config')

const url = config.db.url

const connectDB = ()=>{
    try {
        mongoose.connect(url)
        console.log("DB is connected")
    } catch (error) {
        console.log("DB is not connected")
    }
}

module.exports = connectDB