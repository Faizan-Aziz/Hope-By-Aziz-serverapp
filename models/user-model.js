import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true,
    },
    
  },{timestamps:true});

 export const Usermodel = mongoose.model('user', userSchema ,"user");