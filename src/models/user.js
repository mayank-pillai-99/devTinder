const mongoose=require('mongoose');
const validator=require('validator'); 
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxLength:50
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            };
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Weak password');
            }
        }
    },
    age:{
        type:Number,
        min:16,

    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error('Invalid gender');
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Invalid URL');
            };
        }
    },
    about:{
        type:String,
        default:"This is default about of the user"
    },
    skills:{
        type:[String],
    }
},{timestamps:true});
 
UserSchema.methods.getJWT= async function(){   
    const user=this;
    const token = await jwt.sign({ userId: this._id }, 'DEV@Tinder$970',{expiresIn:'1d'});
    return token;
}
UserSchema.methods.verifyPassword= async function(password){
    const user=this;
    const passwordHash=user.password;
    const isMatch = await bcrypt.compare(password, passwordHash);
    return isMatch;
}
module.exports=mongoose.model('User',UserSchema);
