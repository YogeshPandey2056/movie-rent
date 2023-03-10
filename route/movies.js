const mongoose = require('mongoose');
const {Genres} = require('../models/genre');
const express = require('express');
const router = express.Router();
const {Movie,validate} = require('../models/movies');

router.get('/',async(req,res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
})

router.post('/',async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    
    const genre = await Genres.findById(req.body.genreId);
    if(!genre) return res.status(404).send('The GenreId is not valid....');

   let movies = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });

    movies = await movies.save();

    res.send(movies);


})
router.put('/:id',async(req,res) => {
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genres.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Could not find the genreId');

    const movies = await Movie.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRent:req.body.dailyRentalRent
    },{new:true});

    res.send(movies);
});

router.delete('/:id',async(req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send("MovieId not found....");

    res.send(movie);
})

module.exports = router;