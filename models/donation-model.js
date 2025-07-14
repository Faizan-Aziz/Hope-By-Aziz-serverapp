import mongoose from 'mongoose'

const DonationSchema = new mongoose.Schema({

    amount:{
        type : Number,
        required:true
    },
    message:{
        type : String,
        required:true
    },
    campaign:{
        type : mongoose.Schema.Types.ObjectId, // Stores the _id of a Campaign document
        ref: 'campaigns'    // References the 'campaigns' collection
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    paymentID: {
        type: String,
        required: true,
    }

},{timestamps : true});

export const DonationModel= mongoose.model('donations', DonationSchema , 'donations')