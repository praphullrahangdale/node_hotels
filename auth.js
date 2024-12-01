const passport = require('passport')
const Localstrategy = require('passport-local').Strategy
const Person = require('./models/person')

passport.use(new Localstrategy(async(USERNAME, password, done) =>{
    //authentication logic here
    try {
      const user = await Person.findOne({username:USERNAME})
      if(!user){
        return done(null, false, {message : "Invalid username"})
      }
  
      const isPasswordMatch = await user.comparePassword(password)
      if(isPasswordMatch){
        return done(null, user)
      }
      else{
        return done(null, false, {message : "Invalid password"})
      }
    } catch (error) {
      return done(error);
    }
    
  }))

module.exports = passport  