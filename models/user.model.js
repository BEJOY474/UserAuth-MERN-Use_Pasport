const mongoose = require('mongoose')

const userScheema = new mongoose.Schema({
    name:{
        type : String,
        required : [true, "Name is must required"]
    },
    username:{
        type : String,
        required : [true, "Email is must required"]
    },
    phone:{
        type : String,
        required : [true, "Phone is must required"]
    },
    password:{
        type : String,
        required : [true, "password is must required"]
    },
    createAt:{
        type : Date,
        default  : Date.now 
    },
})

exports.User = mongoose.model('User', userScheema)