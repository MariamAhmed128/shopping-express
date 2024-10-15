const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongodbUri = process.env.MONGODB_URI;
const databaseName = 'shopping_express';

const connectDB = async () => {
	try {
		console.log('Trying to connect Mongodb...')
		await mongoose.connect(`${mongodbUri}/${databaseName}`)
		console.log(`MongoDB connected and the database name is: "${databaseName}"`)
	} catch (err) {
		console.log(err)
	}
}

module.exports = connectDB;
