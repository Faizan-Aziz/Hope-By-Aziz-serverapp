import mongoose from "mongoose";
const campaignSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    organizer :{
        type:String,
        required: true
    },
    targetamount :{
        type:Number,
        required: true
    },
    category :{
        type:String,
        required: true
    },
    startDate : {
        type:String,
        required: true
    },
    endDate : {
        type:String,
        required: true
    },
    collectedAmout :{
        type:Number,
        required: true,
    },
    isActive :{
        type:Boolean,
        required:true,
        default :true,
    },
    showDonorInCampaignPage: {
        type:Boolean,
        required:true,
        default :true,
    },
    images :{
      type:Array,
      required:false,
    }

    },{timestamps : true}) //it enable two field automatically mean when the field first create and when it update last 1-createdAt  2-updatedAt

    export const CampaignModel = mongoose.model('campaigns', campaignSchema ,"campaigns");
