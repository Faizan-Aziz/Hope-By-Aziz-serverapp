import express from "express"
import { Usermodel } from "../models/user-model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {authenticationMiddleware} from "../middleware/middleware.js"


const router = express.Router();

router.post('/RegisterPage' , async(req,res)=>{
    try {
        
        //check if the user is already exsit
        const user= await Usermodel.findOne({email: req.body.email})   
        if (user) {
            return res.status(400).json({ message: "User Already Exist" })
        }
 
        //hash the password

        const hashedPassword = await bcrypt.hash(req.body.password ,10)
        req.body.password = hashedPassword;

        //create the user
        await Usermodel.create(req.body)
        
        return res.status(201).json({message: "User created Successfully"})

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
})



router.post('/Login', async(req,res)=>{
    try {
        
        // Step NO 1: check if the user exists

        const user = await Usermodel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User does not exsit" })
        }

        // Step No 2: compare the password

        const passwordMatched= await bcrypt.compare(
         req.body.password,
         user.password
        );

        if(!passwordMatched){
            return res.status(400).json({message: "Invalid credentials"})
        }

        //Step No 3: create a jwt token and return it 
        const token=jwt.sign({
            userID: user._id,
            email:user.email
        },  process.env.JWT_SECRET,{expiresIn:"1h"})

        return res.status(200).json({token , message : "user loged in successfully" })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})



router.get("/current-user", authenticationMiddleware, async (req, res) => {
    try {
        const userID = req.user.userID; // Extract userID from JWT io website if you want to see what type of properties in it after decode it   
                                        // "payload":{4 items
                                        // "userID": "684638a1495316281e74b9a6"
                                        // "email": "faizan123@gmial.com"
                                        // "iat": 1749475034
                                        // "exp": 1749478634
    

        // Find user and exclude the password field
        const user = await Usermodel.findById(userID).select("-password");

        return res.status(200).json({ user }); // Wrapped in an object for consistency

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.get("/all-user", authenticationMiddleware, async (req, res) => {
    try {
        const user = await Usermodel.find().select("-password").sort({createdAT: -1});
        return res.status(200).json({ user }); // Wrapped in an object for consistency
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
  

export default router;
