const express=require('express');
const User=require('../models/user');
const {validateSignUpData}=require('../utils/validation');
const authRouter=express.Router();
const bcrypt=require('bcrypt');

//signup 
authRouter.post('/signup',async (req,res)=>{  
    try{
        // Validate request data
        validateSignUpData(req);
        const {firstName,lastName,password,emailId}=req.body;
        //encrypt password
        const passwordHash=await bcrypt.hash(password,10);

        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
        await user.save();
        res.status(201).send('User registered successfully');
    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).send('ERROR: '+error.message );
    }
});

//login
authRouter.post('/login', async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if (!user){
            throw new Error('Invalid Credentials');
        }
        const isMatch = await user.verifyPassword(password);
        if (isMatch) {
            const token = await user.getJWT();
            res.cookie('token', token,{
                expires: new Date(Date.now() + 86400000), // 1 day
            });
            res.send('Login successful');
        } else {
            throw new Error('Invalid Credentials');
        }
        
    }catch(error){
        console.error('Error logging in user:', error);
        res.status(500).send('ERROR: '+error.message );
    }
});

//logout
authRouter.post('/logout',async (req,res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
    });
    res.send('Logout successful');
})

module.exports=authRouter;