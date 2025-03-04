import mongoose from "mongoose";
require("dotenv").config();

const dbURL: string = process.env.DB_URL || "";

const connectDB = async () => {
  if (!dbURL) {
    console.error("Database URL is not defined!");
    return;
  }

  console.log("Connecting to the database...");

  try {
    await mongoose.connect(dbURL, {
      connectTimeoutMS: 10000, 
    });

    console.log("Connected to the database successfully!");

  } catch (error: any) {
    console.error(`Failed to connect to the database: ${error.message}`);
    
    // إعادة المحاولة بعد 5 ثواني
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
