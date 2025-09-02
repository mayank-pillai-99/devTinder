const User=require('../models/user');
const jwt = require('jsonwebtoken');

//Middleware to authenticate users
const userAuth= async (req,res,next)=>{
    try{
        //Read the token from cookies
        const {token}=req.cookies;

        if (!token) {  
            throw new Error('Access Denied. No token provided.');
        }
        //Validate the token
        const decodedMessage= jwt.verify(token,'DEV@Tinder$970');
        if(!decodedMessage){
            return res.status(401).send('Access Denied. Invalid token.');
        }
        //Find the User from the token
        const {userId}=decodedMessage;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).send('User not found');
        }
        req.user=user; //Attach user to request object
        next();
    }catch(error){
        console.error('Error in authentication middleware:', error);
        return res.status(500).send('Internal Server Error');
    }
    
}

module.exports = { userAuth };