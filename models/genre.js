const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = new mongoose.Schema({
    name:{type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});

const Genres = mongoose.model('Genres',genreSchema);

function validateGenres(genre)
{
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required()
    });
    return schema.validate(genre);
}

module.exports.genreSchema=genreSchema;
module.exports.Genres =Genres;
module.exports.validate = validateGenres;