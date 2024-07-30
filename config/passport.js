const passport = require('passport');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
//console.log("login calliioo")

passport.use(new LocalStrategy(
   async (username, password, done) => {

    try {
        const user = await  User.findOne({ username : username })
        // if (!user) {
        //     return done(null, false, {massage : "Incorrect email"}); 

        // }
        // if (!bcrypt.compare(password, user.password)) {
        //     return done(null, false, {massage : "Incorrect password"}); 
        // }
        // return done(null, user);

        bcrypt.compare(password, user.password, (err, result)=> {
            if(result==true){
                return done(null, user);
            }else{
                return done(null, false, {massage : "Invalid user"}); 
            }
        });
       
    } catch (error) {
        return done(error);
    }

    }
  ));



  //create session id
  //whenever we login it create user id inside session

  passport.serializeUser((user , done) =>{
    done(null , user.id)
  });

  passport.deserializeUser(async (id, done)=>{
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false)
    }
  })
 