const { Order } = require('./../models');
const productService  = require('./../services/product');

const orderService = {
	getOrders: async (req, res) => {
		const orders = await Order.find();
		return orders;
	},

	checkout: async (req, res) => {
		return productService.getProductsByIds(req.session.productIds);
	},

	addToCart: async (req, res) => {
		if(!req.session.productIds) req.session.productIds = [];
		
		if(req.session.productIds.includes(req.params.productId)) {
			return {message: 'This product is already added to the cart'}
		}

		req.session.productIds.push(req.params.productId);

		return req.session.productIds;
	},

	removeFromCart: async (req, res) => {
		const productIds = req.session.productIds;
		if(!productIds || (productIds && !productIds.length)) return {message: 'No items available to remove from the cart'}

		req.session.productIds = await productIds.filter(proId => proId != req.params.productId);

		return {message: 'Product removed from the cart'}
	},

	purchage: async (req, res) => {
		const productIds = req.session.productIds;

		if(!productIds || (productIds && !productIds.length)) return {message: 'No orders purchaged'}

		productIds.forEach(async proId => {
			const products = await productService.getProductsByIds([proId]);
			const product = products[0]
			const order = new Order()
			order.productId = product._id;
			order.price = product.price;
			order.quantity = product.quantity; 
			order.userId = req.user._id;
			await order.save();
		});

		req.session.productIds = [];
		return {message: 'Successfully purchaged the orders'}
	}
}

module.exports = orderService;