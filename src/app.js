const express = require('express');
const connectDB=require('./config/database');
const app = express();
const User=require('./models/user');

app.use(express.json())

app.post('/signup',async (req,res)=>{
    const userObj=req.body;
    const user=new User(userObj);
    try{
        await user.save();
        res.status(201).send('User registered successfully');
    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
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
 



