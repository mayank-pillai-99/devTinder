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

const validateProfileUpdateData=(req)=>{
    const ALLOWED_UPDATES = [
        "photoURL",
        "about",
        "gender",
        "skills",
        "firstName",
        "lastName",
        "age"
    ];

    const isUpdateAllowed = Object.keys(req.body).every((k) => ALLOWED_UPDATES.includes(k));

    if (!isUpdateAllowed) {
        throw new Error("Edit Not Allowed")
    }
}

module.exports={validateSignUpData, validateProfileUpdateData};