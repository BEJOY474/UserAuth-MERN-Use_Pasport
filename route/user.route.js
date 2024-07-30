const express = require('express')
const passport = require('passport')
const { registration, registrationFile, loginFile, profile, logout, checkLoggedIn, checkprofileAuth } = require('../controllers/user.controller')

const route = express.Router()


 route.get('/registration', registrationFile)

 route.post('/registration', registration)



module.exports = route