import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
  const url = process.env.MONGODB_URL; // Assign the environment variable to a variable

  if (!url) {
    console.error('MONGODB_URL is not defined in the environment variables.');
    return;
  }

  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Failed to connect to MongoDB');
      console.error(err);
    });
};

export default connectDB;
