// imports
const express = require('express');


//create express app
const app = express();



//test route
app.get('/', (req , res ) => {
    res.send('its live now');
})




// create server 
app.listen(3001 , () => {
    console.log('server is running at 3001')
})