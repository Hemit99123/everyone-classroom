import * as mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connections && mongoose.connections[0] && mongoose.connections[0].readyState) return;

  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL environment variable is not defined.');
    }

    await mongoose.connect(mongoUrl);

    console.log('Mongo Connection successfully established.');
  } catch (error: any) {
    console.error('Error connecting to Mongoose:', error.message);
    throw error;
  }
};

export default connect;
