import mongoose from "mongoose";
import  DB_NAME from "../constant.js";
console.log(DB_NAME)
const connectDB = async () => {
    try {
        const connectionInstant = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connection !! DB HOST:${connectionInstant.Connection.host}`)
    }
    catch (error) {
        console.log("MONGDB connection error", error);
        process.exit(1)
    }
}
    export default connectDB
