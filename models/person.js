const mongoose = require('mongoose');

//Define the person schema
const personSchema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    age: {
        type : Number,
        required : true
    },
    work: {
        type : String,
        enum : ['chef', 'manager', 'waiter'],
        required : true
    },
    mobile: {
        type : String,
        required : true
    },
    email: {
        type : String,
        unique : true,
        required : true
    },
    address: {
        type : String,
    },
    salary: {
        type : Number,
        required : true
    }
})

//Create person model
const Person = mongoose.model('Person', personSchema)
module.exports = Person