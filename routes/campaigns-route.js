import express from 'express'
import {authenticationMiddleware} from "../middleware/middleware.js"
import {CampaignModel} from "../models/campaign-model.js"
import mongoose from "mongoose";  //this is for conversion
const router =express.Router();


router.post("/create" , authenticationMiddleware , async(req, res) => {
    try {  
        req.body.collectedAmout=0;
        await CampaignModel.create(req.body);
        return res.status(201).json({message : "Campaign created successfully"})

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
})


router.put("/update/:id" , authenticationMiddleware , async (req,res)=>{
    try {
        
        await CampaignModel.findByIdAndUpdate(req.params.id ,req.body);
        return res.status(200).json({message : "Campaign updated successfully"})

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
})


router.delete("/delete/:id" , authenticationMiddleware , async (req,res)=>{
    try {
        
        await CampaignModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message : "Campaign deleted Successfully"})

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
})


router.get("/get-all",authenticationMiddleware,async (req,res) =>{
    try {
        const campaigns = await CampaignModel.find().sort({createdAt: -1});
        return res.status(200).json(campaigns)
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
});


router.get("/get/:id",authenticationMiddleware,async (req,res) =>{
    try {

        const campaigns = await CampaignModel.find({ _id: new mongoose.Types.ObjectId(req.params.id) }); //re.paramas.id return string but we need object id to find
        return res.status(200).json(campaigns)
        
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
});

export default router;
 