import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("\n MongoDB connected Succesfully")
    } catch (error) {
        console.log("Error While Connecting to the Database",error)
        process.exit(1)
    }
}

