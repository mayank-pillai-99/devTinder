const validator=require('validator');

const validateSignUpData= (req)=>{
    const {firstName,lastName,emailId,password} =req.body;
    if(!firstName || !lastName || !emailId || !password){
        throw new Error('All fields are required');
    }
    if(!validator.isEmail(emailId)){
        throw new Error('Invalid email');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Weak password');
    }
}
module.exports={validateSignUpData};