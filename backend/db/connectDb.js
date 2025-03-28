import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const  connectDb = async()=>{
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("connected to database")
}

connectDb().catch(err=>console.log(err))

export default connectDb