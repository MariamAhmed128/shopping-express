const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
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
		enum: ['created', 'pickedup', 'delivered'],
		default: 'created'
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
}, {
	timestamps: true
});

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;
