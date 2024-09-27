import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const uri = process.env.MONGO_URL; 
    try {
        const connectionInstance = await mongoose.connect(`${uri}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // client.connect()
        // client.db("myDatabase")
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB