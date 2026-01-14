// imports
const express = require('express');


// internal imports
const connectDB = require('./config/db');


//create express app
const app = express();
// to read json body
app.use(express.json());

// starting mongodb
connectDB();



//test route
app.get('/', (req , res ) => {
    res.send('its live now');
})
app.post('/test',(req , res) => {

    const {name , email , password} = req.body;
    console.log(req.body)
    if(!name||!email||!password){
        return res.status(400).json({
            message:'all fields required'
        })
    }else{
        res.status(201).json({
            message:'user data accepted'
        })
    }
})




// create server 
app.listen(3001 , () => {
    console.log('server is running at 3001')
})