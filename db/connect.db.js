import mongoose from "mongoose";
// import dotenv from "dotenv"

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://dbuser:1KXE8OzpTXb5mLXK@cluster0.vvb8c.mongodb.net/");
        console.log(' Hi Mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;