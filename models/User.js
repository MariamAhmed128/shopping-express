const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
		trim: true,
		lowercase: true,
		match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['retailer', 'customer'],
		required: true
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active'
	}
}, {
	timestamps: true
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
