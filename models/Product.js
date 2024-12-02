const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		minLength: 4,
		maxLength: 20,
		required: true,
		trim: true
	},

	description: {
		type: String,
		maxLength: 100,
		required: true
	},

	price: {
		type: mongoose.Types.Decimal128,
		min: [0.0, 'Prive must be a positive number'],
		required: true
	},

	quantity: {
		type: Number,
		required: true,
		max: [20, 'Maximum quantity should be 20']
	},

	status: {
		type: String,
		enum: ['opened', 'closed'],
		default: 'opened'
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	images: {
		type: [String],
		required: true
	}
}, {
	timestamps: true
})

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;
