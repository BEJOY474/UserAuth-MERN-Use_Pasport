const bcrypt = require('bcrypt')
const saltRounds = 10
const { User } = require("../models/user.model");



exports.registration =  async (req, res)=>{

    try {

        bcrypt.hash(req.body.password, saltRounds, async (err, hash)=> {
            const newUser = new User({
                name : req.body.name,
                username : req.body.username,
                phone : req.body.phone,
                password : hash
           })
       
           const dataUser = await newUser.save()
    
           if (dataUser) {
            res.status(200).redirect("/login")
           } else {
            res.status(404).send({
                success : false,
                massage : "404 error"
            })
           }
        });

    } catch (error) {
        res.status(505).send({
            success : false,
            massage : "404 error"
        })
    }

}

exports.registrationFile = (req, res)=>{
    res.render("registration", {})
}

exports.checkLoggedIn = (req, res ,next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/profile')
    } else {
        next()
    }
}

exports.loginFile = (req, res)=>{
    res.render("login", {})
}

exports.checkprofileAuth = (req, res ,next)=>{
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/login')
    }
}

exports.profile = (req, res)=>{
 
        res.render("profile", {}) 
  
}

exports.logout = (req, res)=>{
    
    try {
        req.logout((err)=>{
            if (err) {
                return next(err)
            } else {
                res.redirect("/") 
            }
        })
    } catch (error) {
        res.status(500).send(error.massage)
    }
}
