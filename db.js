const mongoose = require('mongoose')
require('dotenv').config();

//Define the mongoDB connection URL
// const mongoURL = process.env.DB_URL_LOCAL
   const mongoURL = process.env.DB_URL

//Set up mongoDB connection
mongoose.connect(mongoURL, {
    // useNewUrlParser : true,
    // useUnifiedTopology : true
})

//Get the default connection
const db = mongoose.connection;

//Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error', (err) => {
    console.log('mongoDB connection error', err)
})

db.on('disconnected', () => {
    console.log('mongoDB disconnected');
})

//Export the database connection
module.exports = db;