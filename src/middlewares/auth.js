const adminAuth=(req,res,next)=>{
    console.log('Admin Auth Middleware');
    const authToken = 'Bearer mysecrettoken';
    if(authToken === 'Bearer mysecrettoken'){
        next();
    }else{
        res.status(403).send('Forbidden');
    }
}

const userAuth=(req,res,next)=>{
    console.log('User Auth Middleware');
    const authToken = 'Bearer mysecrettoken';
    if(authToken === 'Bearer mysecrettoken'){
        next();
    }else{
        res.status(403).send('Forbidden');
    }
}

module.exports = { adminAuth,userAuth };