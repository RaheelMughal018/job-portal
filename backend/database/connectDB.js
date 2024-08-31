
import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "JOB_PORTAL"
    }).then(()=>{
        console.log(`MongoDB connected...${mongoose.connection.host} and Port ${mongoose.connection.port}`);
    }).catch((err)=>{
        console.log("MongoDB connection error..." + err);
        process.exit(1);
    })
}