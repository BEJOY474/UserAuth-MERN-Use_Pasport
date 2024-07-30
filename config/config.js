require('dotenv').config()

const dev = {
    app:{
        port : process.env.PORT || 8080
    },
    db:{
      //  url : process.env.DB_URL || "mongodb://localhost:27017/canteen"
        url :"mongodb://localhost:27017/canteen"
    }
}

module.exports = dev