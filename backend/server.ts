import app  from "./app";
import connectDB from './src/config/db';
require("dotenv").config();

//create server
app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);   // server is listening on the port specified in the environment variable PORT
    connectDB();
});