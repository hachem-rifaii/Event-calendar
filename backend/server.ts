import app  from './app';
import dotenv from 'dotenv';
import connectDB from './src/config/db';
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
