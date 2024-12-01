const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const passport = require('./auth');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000

//Middleware function
const logRequest = (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}
//Apply middleware to all routes
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session : false});

app.get('/',function (req, res) {
  res.send('Welcome to our hotel')
})

//Import the router files
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')
const Person = require('./models/person')

//Use the routes
app.use('/person',personRoutes)
app.use('/menu', menuItemRoutes)

app.listen(PORT, ()=>{
    console.log('listening on port 3000')
})