import mongoose from "mongoose";
// import dotenv from "dotenv"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.dbName}`);
        console.log(' Hi Mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;