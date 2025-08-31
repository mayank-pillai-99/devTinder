const express = require('express');
const {adminAuth,userAuth}=require('./middlewares/auth');
const app = express();


app.use('/admin',adminAuth);

app.get('/user',userAuth,(req,res)=>{
    res.send('Here is User Data for all users');
});
app.get('/admin/getAllData',(req,res)=>{
    res.send('Here is all admin data');
});

app.delete('/admin/deleteUser',(req,res)=>{
    res.send('User Deleted');
});
  
app.listen(3000,() => {
    console.log('Server is running on port 3000');
});


