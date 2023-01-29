const mongoose = require('mongoose');
const Joi = require('joi');
const customerSchema = new mongoose.Schema({
    name:{type:String,
        minlength:5,
        maxlength:50,
        required:true        
    },
    isGold:{type:Boolean,default:false},
    phone:{type:String,minlength:10,maxlength:10,required:true}

    
});
const Customer = mongoose.model('customer',customerSchema);

function validateCustomer(customer)
{
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean(),
        phone:Joi.string().max(10).min(10).required()
    });
    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;