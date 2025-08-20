const mongoose = require('mongoose');  // ← مهم جداً
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    console.log('Trying to connect Mongodb...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
