import mongoose from "mongoose";

const connectMongoDB= async()=>{
    try {
        
       await mongoose.connect(process.env.DATABASE_URL);
       console.log("connected to mongo db")

    } catch (error) {
        console.log("error connecting to MongoDB")
    }
}

export default connectMongoDB;