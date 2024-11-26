const { orderService } = require('./../services');

const ordersController = {
	index: async (req, res) => {
		try {
			const orders = await orderService.getOrders();
			res.status(200).send(orders);
		} catch(err) {
			res.status(400).send(err);
		}
	},

	checkout: async (req, res) => {
		try {
			const order = await orderService.checkout(req, res);
			res.status(201).send(order);
		} catch(err) {
			res.status(400).send(err);
		}
	},

	addCart: async (req, res) => {
		try {
			const order = await orderService.addToCart(req, res);
			res.status(201).send(order);
		} catch(err) {
			res.status(400).send(err);
		}
	},

	removeCart: async (req, res) => {
		console.log('COMING here')
		try {
			const order = await orderService.removeFromCart(req, res);
			res.status(201).send(order);
		} catch(err) {
			res.status(400).send(err);
		}
	},

	purchage: async (req, res) => {
		try {
			const order = await orderService.purchage(req, res);
			res.status(201).send(order);
		} catch(err) {
			res.status(400).send(err);
		}
	}
}

module.exports = ordersController;