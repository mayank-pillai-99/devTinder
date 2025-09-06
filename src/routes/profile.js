const express=require('express');
const { userAuth } = require('../middlewares/auth');
const user = require('../models/user');
const { validateProfileUpdateData } = require('../utils/validation');

const profileRouter=express.Router();

//get profile of the logged in user
profileRouter.get('/profile', userAuth, async  (req, res) => {
    try{
    const user=req.user;
    res.send(user);
    }catch(error){
        console.error('Error fetching profile:', error);
        res.status(500).send('Something went wrong');
    }
}); 

//edit profile of the logged in user
profileRouter.patch('/profile/edit',userAuth, async (req,res)=>{
    try{
        validateProfileUpdateData(req);
        const user=req.user;
        Object.keys(req.body).forEach((key)=>{
            user[key]=req.body[key];
        })
        await user.save();
        res.json({message: `${user.firstName} your Profile was updated successfully`,data:user});
    }catch(error){
        console.error('Error updating profile:', error);
        res.status(400).send('ERROR: '+error.message);
    }
});

profileRouter.patch('/profile/password',async (req,res)=>{
    try{
        const user=req.user;
        const {oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword){
            throw new Error('All fields are required');
        }
        if(!user.verifyPassword(oldPassword)){
            throw new Error('Invalid Credentials');
        }
        user.password=newPassword;
        await user.save();
        res.send('Password updated successfully');

    }catch(err){
        console.error('Error updating password:', err);
        res.status(400).send('ERROR: '+err.message);
    }
})

module.exports=profileRouter;
