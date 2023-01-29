const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('Welcome to movies rent');
})

module.exports=router;