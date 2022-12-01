'use strict';

const express = require('express');
const { ClothModel } = require('../models');

const router = express.Router();

router.get('/cloths', async (req, res, next) => {
  try{
    const cloths = await ClothModel.findAll();
    res.status(200).send(cloths);
  } catch(e){
    next(e);
  }
});


router.get('/cloths/:id', async (req, res, next) => {

  try{
    let id = parseInt(req.params.id);
    const cloths = await ClothModel.findOne({where: {id}});
    res.status(200).send(cloths);
  } catch(e){
    next(e);
  }
});

router.post('/cloths/', async (req, res, next) => {
  try {
    const newCloths = await ClothModel.create(req.body);
    res.status(201).send(newCloths);
  } catch(e){
    next(e);
  }
});

router.put('/cloths/:id', async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let newCloths = req.body
    const cloths = await ClothModel.findOne({where: {id}});
    let updatedCustomer = await cloths.update(newCloths)
    res.status(200).send(updatedCustomer);
  } catch(e){
    next(e);
  }
});

router.delete('/cloths/:id', async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    await ClothModel.destroy({where: {id}});
    res.status(200).send('cloths deleted');
  } catch(e){
    next(e);
  }
});



module.exports = router;