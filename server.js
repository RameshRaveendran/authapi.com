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
// app.get('/', (req , res ) => {
//     res.send('its live now');
// })
// app.post('/test',(req , res) => {

//     const {name , email , password} = req.body;
//     console.log(req.body)
//     if(!name||!email||!password){
//         return res.status(400).json({
//             message:'all fields required'
//         })
//     }else{
//         res.status(201).json({
//             message:'user data accepted'
//         })
//     }
// });

app.post('/users', async (req , res ) => {
// Input validation

// Duplicate check

// Database write

// Error handling

// Proper status codes
    // get the details and destructured
    const {name , email , password} = req.body;
    // error handling with try catch block (remember)
    try {
     // validate input
        if(!name || !email || !password){
            return res.status(400).json({
                message:"all field required"
            });
        }

    // check this user is exist 
    // getting the user details by uniq one "email"
    const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({
                message:'User already Registerd'
            });
        }


    // create user
        const user = new User({
            name,
            email,
            password
        });
    // save to db
        await user.save();

        res.status(201).json({
            message:'User Registerd Successflly'
        })
        
    //if any server error  
    } catch (error) {
        res.status(500).json({
            message:'server error'
        });
    }




})




// create server 
app.listen(3001 , () => {
    console.log('server is running at 3001')
})