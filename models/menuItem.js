const mongoose = require('mongoose')

//Define the menuItem schema
const menuItemSchema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    taste: {
        type : String,
        enum : ['sweet', 'spicy', 'sour'],
        required : true
    },
    is_drink: {
        type : Boolean,
        default : false
    },
    ingredients: {
        type : [String],
        default : []
    }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema)
module.exports = MenuItem