const express = require('express')
const knex = require('knex')

const db = require('./data/connection')

const router = express.Router()

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.status(200).json({data: cars})
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to retrieve the cars'})
    })
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db('cars').where({ id })
    .then(car => {
      res.json(car);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve car' });
    });
  });

router.post('/', (req, res) => {
    req.body.vin && req.body.make && req.body.model && req.body.mileage ? 
    db('cars').insert(req.body, "id")
    .then(ids => {
        res.status(201).json({data: ids})
    })
    .catch(err => {
        res.status(500).json({message: "failed to store the data"})
    })
    : res.status(400).json({message: "please fill in the desired fields of Vin, make, model, and milage"})

})

router.put('/:id', (req, res) => {
    db('cars').where({ id: req.params.id}).update(req.body)
    .then(count => {
        res.status(200).json({data: count})
    })
    .catch(err => {
        res.status(500).json({message: 'there was an error editing this item'})
    })
})
router.delete('/:id', (req, res) => {
    db('cars').where({ id: req.params.id}).delete()
    .then(count => {
        res.status(200).json({data: count})
    })
    .catch(err => {
        res.status(500).json({message: 'there was an error editing this item'})
    })
})


module.exports = router