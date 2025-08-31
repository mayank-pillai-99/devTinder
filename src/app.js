const express = require('express');

const app = express();

app.use('/',(req,res)=>{
    res.send('Hello fom the dashboard');
})

app.use('/users',(req,res)=>{
    res.send('Hello from the users');
});

app.use('/test',(req,res)=>{
    res.send('Hello from the test');
});

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});


