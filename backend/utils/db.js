import mongoose from "mongoose";

const connectDB = async (retries = 5, delay = 5000) => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined in the environment variables');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        if (retries === 0) {
            console.error('Failed to connect to MongoDB. No retries left:', error);
            process.exit(1); // Exit the process if all retries fail
        } else {
            console.warn(`Retrying to connect to MongoDB (${retries} retries left)...`);
            setTimeout(() => connectDB(retries - 1, delay), delay);
        }
    }
};

// Mongoose connection events for better debugging
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
});

export default connectDB;