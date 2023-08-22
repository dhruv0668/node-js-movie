import mongoose from "mongoose";

const connectDB= async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/E-commerce1");
        console.log("connection successfully on database")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB