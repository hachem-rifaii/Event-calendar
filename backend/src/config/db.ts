import mongoose from "mongoose";
require("dotenv").config();
const dbURL: string =
  "mongodb+srv://hachemrifai9:9zkumLT81X4ef11n@cluster0.zhl0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  mongoose
    .connect(dbURL, {
      useNewUrlParser : true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    });
};

export default connectDB;
