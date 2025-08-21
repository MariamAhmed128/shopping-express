const { Order } = require('../models');
const productService  = require('./product');

const orderService = {
	getOrders: async (req, res) => {
		const orders = await Order.find();
		console.log("req.user._id =>", req.user._id);
		return orders;
	},

	checkout: async (req, res) => {
		return productService.getProductsByIds(req.session.productIds);
	},

	addToCart: async (req, res) => {
		try {
			const { productId } = req.params;
			const { userId, price, quantity } = req.body;

			const order = new Order({
				productId,
				userId,
				price,
				quantity
			});

			const savedOrder = await order.save();

			return { message: 'Order created successfully', order: savedOrder };
		} catch (error) {
			console.error(error);
			return { message: 'Failed to create order', error };
		}
	},

	removeFromCart: async (req, res) => {
		const productIds = req.session.productIds;
		if(!productIds || (productIds && !productIds.length)) return {message: 'No items available to remove from the cart'}

		req.session.productIds = await productIds.filter(proId => proId != req.params.productId);

		return {message: 'Product removed from the cart'}
	},
	purchage: async (req) => {
		try {
			// هات كل الأوردرات اللي لسه في الكارت (created)
			const orders = await Order.find({ userId: req.user._id, status: 'created' });

			if (!orders.length) {
				return { message: "No orders purchaged" };
			}

			// عدل حالة الأوردرات لـ purchased
			for (const order of orders) {
				// order.status = "purchased";
				order.status = 'created'; // أو 'pickedup' حسب منطق التطبيق
				await order.save();
			}

			return {
				message: "Successfully purchaged the orders",
				orders
			};
		} catch (err) {
			throw err;
		}
	},


}

module.exports = orderService;