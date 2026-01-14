// imports
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// internal imports
const connectDB = require('./config/db');
const User = require ('./models/User');

// dotenv
require('dotenv').config();


//create express app
const app = express();
// to read json body
app.use(express.json());

// starting mongodb
connectDB();



// register route

app.post('/users', async (req , res ) => {
// Input validation

// Duplicate check

// Database write

// Error handling

// Proper status codes
    // get the details and destructured
    const {name , email , password} = req.body;
    console.log('done')
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
    const hashedPassword = await bcrypt.hash(password , 10);

    // create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
    // save to db
        await user.save();

        res.status(201).json({
            message:'User Registerd Successflly'
        })
        
    //if any server error  
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:'server error',
            error:error.message
        });
    }




});

// login setup with jwt token 
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password required'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 2. Find by EMAIL ONLY
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // 4. Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});





// create server 
app.listen(3001 , () => {
    console.log('server is running at 3001')
})