const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { json } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const home=require('./route/home');
const genre=require('./route/genre');
const customer = require('./route/customer');
const movies = require('./route/movies');
const rentals = require('./route/rental');
const user = require('./route/user-login');
const auth = require('./route/auth');
require("dotenv").config();

mongoose.connect('mongodb://localhost/mymovies')
.then(() => console.log('Connected to database...'))
.catch(err => console.error('Failed to connect to database..',err));

if(!config.has('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1);
}

app.use('/api/genres',genre);
app.use('/api/customers',customer);
app.use('/api/movies',movies);
app.use('/api/auth',auth);
app.use('/api/rentals',rentals);
app.use('/api/users',user);
app.use('/',home);


const port = process.env.PORT || 4000;
app.listen(port,(req,res) => console.log(`listening to port ${port}`));

