// const mongoose = require('mongoose');  
// const dotenv = require('dotenv');
// dotenv.config();

// const connectDB = async () => {
//   try {
//     console.log('Trying to connect Mongodb...');
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = connectDB;
























const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    console.log('Trying to connect Mongodb...');

    // لو شغال محلي هياخد MONGO_URI_LOCAL
    // لو في Production (زي Render) هياخد MONGO_URI_ATLAS
    const uri = process.env.NODE_ENV === 'production' 
      ? process.env.MONGO_URI_ATLAS 
      : process.env.MONGO_URI_LOCAL;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
