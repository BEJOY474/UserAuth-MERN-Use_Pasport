const express = require('express')
const app = express()
const userRoute = require('../route/user.route')
const connectDB = require('../config/db')
const config = require('../config/config')
 require('../config/passport')


const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const { registration, registrationFile, loginFile, profile, logout, checkLoggedIn, checkprofileAuth } = require('../controllers/user.controller')

//ejs setup
app.set("view engine", "ejs")
app.use(userRoute)

//database connection
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//session create and store start


URL_DB = config.db.url

app.set('trust proxy', 1) 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl : URL_DB,
        collectionName : "sessions"
    })
   // cookie: { secure: true }
  }))

app.use(passport.initialize())
app.use(passport.session())

//session create and store end


app.get('/', (req, res)=>{
    res.render("index", {})
} )
app.get('/login',checkLoggedIn, loginFile)

app.post('/log', 
      passport.authenticate('local', { failureRedirect: '/login',
        successRedirect : '/profile'
     })
);

app.get('/profile',checkprofileAuth, profile)

app.get('/logout', logout)

//error route
app.use((req, res, next)=>{
   res.status(404).send({
    success : false,
    massage : "404 error route"
   })
})

//Server error
app.use((err, req, res, next)=>{
    res.status(505).send({
        success : false,
        massage : "505 server error"
       })
} )

module.exports = app