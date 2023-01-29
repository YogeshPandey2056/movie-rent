const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const {Genres,validate} = require('../models/genre');
const express =require('express');
const router = express.Router();


// async function createMovies()
// {
//     const movies = new Movies({
//         genre:'Action'
//     })

//     const result = await movies.save();
//     console.log(result);
// }
// createMovies();

router.get('/:id',async(req,res) => {
    const genre = await Movies.findbyid(req.params.id);
    if(!genre){
        res.status(404).send('Movie not found');
    }

    res.send(movie);
})
router.post('/',auth,async(req,res) => {


    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    let genre = new Genres({
        name:req.body.name
    });
    genre = await genre.save();
   
    res.send(genre);
})
router.put('/:id',async(req,res) => {
    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const genre = await Genres.findByIdAndUpdate(req.params.id, {name:req.body.name},{new:true});
    if(!genre){
        res.status(404).send('Movie not found');
    }
    
    res.send(genre);
})
router.delete('/:id',async(req,res) => {
    const genre = await Genres.findByIdAndRemove(req.params.id);
    if(!genre){
        res.status(404).send('Movie not found');
    }
    res.send(genre);
})



module.exports = router;