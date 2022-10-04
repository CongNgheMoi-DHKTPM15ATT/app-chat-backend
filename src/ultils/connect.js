import mongoose from 'mongoose';

const config = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectDatabase = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URL, config);
    console.log("mongo connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDatabase;