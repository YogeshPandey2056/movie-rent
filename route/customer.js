const mongoose = require('mongoose');
const {Customer,validate} = require('../models/customer');
const express = require('express');
const { boolean, number, string } = require('joi');
const router = express.Router();



router.get('/:id', async(req,res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer)  return res.status(404).send('Customer ID not found');

    res.send(customer);
})

router.post('/', async(req,res) => {
    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    let customer = new Customer ({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    customer = await customer.save();

    res.send(customer);
})

router.put('/:id',async(req,res) => {
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone
    },{new:true});
    if(!customer) res.status(404).send('Cannot find the id....');

    res.send(customer);

})

router.delete('/:id',(req,res) => {
    const customer = Customer.findByIdAndRemove(req.params.id);
    if(!customer) res.status(404).send("Could not find the id....");

    res.send(customer);
})


module.exports=router;
