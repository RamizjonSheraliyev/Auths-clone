import mongoose from 'mongoose';
import { mongoose } from 'mongoose';

const connectDB = async () => {
    try {
        // MongoDB ulanishi
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
        process.exit(1); // Agar xatolik bo'lsa, serverni to'xtatamiz
    }
};

export default connectDB;

