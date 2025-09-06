 const express = require('express');
const connectDB=require('./config/database');
const cookieParser = require('cookie-parser');
const User=require('./models/user');

const app = express();
app.use(cookieParser());
app.use(express.json());

const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/requests');       


app.use('/',authRouter);
app.use('/',profileRouter);  
app.use('/',requestRouter);




//get user by email
app.get('/user', async (req, res) => {
    try{
        const emailId=req.body.emailId;
        const user=await User.find({emailId:emailId});
        if(user.length===0){
            res.status(404).send('User not found');
        }else{
            res.send(user);
        }
    }catch(error){
        console.error('Error fetching user:', error);
        res.status(400).send('Something went wrong');
    }
})

//Feed API- GET /feed -get all the users from the database
app.get('/feed',async (req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(error){
        console.error('Error fetching feed:', error);
        res.status(400).send('Something went wrong');
    }
})

//delete user by their id
app.delete('/user', async (req,res)=>{ 
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    }catch(error){
        console.error('Error deleting user:', error);
        res.status(400).send('Something went wrong');
    }
});
 

//Update data of the user
app.patch('/user/:id', async (req,res)=>{
    const userId=req.params.id;
    const data=req.body;

    
    try{
        const ALLOWED_UPDATES = [
          "photoURL",
          "about",
          "gender",
          "skills",
          "firstName",
          "lastName",
          "age"
        ];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed")
        }
        const user=await User.findByIdAndUpdate(userId,data,{returnDocument:'before',runValidators:true});
        console.log(user);
        res.send(user)
    }catch(error){
        console.error('Error updating user:', error);
        res.status(400).send('Something went wrong');
    }   
}); 

app.use('/',(err,req,res,next)=>{
    if(err){
        res.status(500).send('Internal Server Error');
    }
});
  
connectDB().then(()=>{
    console.log('Database connected successfully');
    app.listen(3000,() => {
    console.log('Server is running on port 3000');
    });
}).catch((error)=>{
    console.error('Database connection failed:',error);
}); 
 



