const express = require('express')
const router = express.Router();
const MenuItem = require('./../models/menuItem')

// POST route to add menu
router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data)
  
      //Save the new person to the database
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({error : 'Internal server error'})
    }
  })
  
  //GET method to get a menu
  router.get('/', async(req, res) =>{
    try {
      const data = await MenuItem.find();
      console.log('data fatched');
      res.status(200).json(data);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({error : 'Internal server error'})
    }
  })

module.exports = router