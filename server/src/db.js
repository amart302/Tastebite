import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Успешное подключение к MongoDB');
  } catch (error) {
    console.error('Не удалось подключиться к MongoDB:', error.message);
    process.exit(1);
  }
};