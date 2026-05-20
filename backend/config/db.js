import mongoose from "mongoose";

export const connectDB = async () => {
  try {

    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined in environment variables");

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB Connected: ", conn.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB:", error);
    process.exit(1); //1 status code means fail, 0 means success
  }
}