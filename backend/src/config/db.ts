import mongoose from "mongoose";
require("dotenv").config();
const dbURL: string ="mongodb+srv://hachemrifai9:9zkumLT81X4ef11n@cluster0.zhl0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL).then((data: any) => {
      console.log(`Connected to the database ${data.connection.host}`);
    });
  } catch (error : any) {
    console.error(`Failed to connect to the database ${error.message} `);
    
    setTimeout(connectDB,5000)
  }
};

export default connectDB;