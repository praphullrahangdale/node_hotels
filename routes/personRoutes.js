const express = require('express')
const router = express.Router();
const Person = require('./../models/person')

// POST route to add a person
router.post('/', async (req, res) => {
    try {
      const data = req.body;
  
      //Create a new person document using the mongoose model
      const newPerson = new Person(data)
  
      //Save the new person to the database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({error : 'Internal server error'})
    }
  })
  
  
  //GET method to get a person
  router.get('/', async(req, res) =>{
    try {
      const data = await Person.find();
      console.log('data fatched');
      res.status(200).json(data);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({error : 'Internal server error'})
    }
  })

//Parametrized endpoints
router.get('/:workType', async(req, res)=>{
    try {
      const workType = req.params.workType;//Extract the work type from URL parameter
  
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const data = await Person.find({work : workType})
        console.log("data fatched")
        res.status(200).json(data)
      }
      else{
        res.status(404).json({error : 'invalid work type'})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error : 'Internal server error'})
    }
  })
//PUT methode to update persons data
router.put('/:id', async(req, res)=>{
    try {
        const personId = req.params.id //Extract the id from URL parameter
        const updatePersonData = req.body //updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
            new : true,
            runValidators : true
        })
        console.log('data updated')
        res.status(200).json(response)

        if(!response){
            return res.status(404).json({error : 'person not found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

router.delete('/:id', async(req, res)=>{
  try {
    const personId = req.params.id //Extract the id from URL parameter

    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error : 'person not found'})
    }
    console.log('data deleted')
    res.status(200).json({message :'Data deleted succsesfully'})

    
  } catch (error) {
    console.log(error);
    res.status(500).json({error : 'Internal server error'})
  }
})
module.exports = router