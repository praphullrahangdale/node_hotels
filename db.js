const mongoose = require('mongoose')

//Define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotel'

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