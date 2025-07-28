import mongoose from 'mongoose';

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URL;
    try {
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
