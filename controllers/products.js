const { productService } = require('../services');

const productsController = {
	// this.الاصلية

	index: async (req, res) => {
		try {
			const products = await productService.getProducts(req, res);
			res.status(200).send(products);
		} catch(err) {
			res.status(400).send(err);
		}
	},
	// index: async (req, res) => {
	// 	try {
	// 		const products = await productService.getProducts(req.query);
	// 		res.status(200).send(products);
	// 	} catch(err) {
	// 		res.status(400).send(err);
	// 	}
	// },


	create: async (req, res) => {
		try {
			const product = await productService.createProduct(req, res);
			res.status(201).send(product);
		} catch(err) {
			res.status(400).send(err);
		}
	},
	// this.الاصلية
	// getProduct: async (req, res) => {
	// 	try {
	// 		const product = await productService.getProduct(req, res);
	// 		res.status(200).send(product);
	// 	} catch(err) {
	// 		res.status(400).send(err);
	// 	}
	// },
	
	getProducts: async (req) => {
		const filters = await productService.setFilters(req);
		const products = await Product.find(filters).sort({ createdAt: -1 });
		return products;
	},

	getProduct: async (req, res) => {
		try {
			const product = await productService.getProduct(req, res);
			res.status(200).send(product);
		} catch(err) {
			res.status(400).send(err);
		}
	},


	update: async (req, res) => {
		try {
			const product = await productService.updateProduct(req, res);
			res.status(201).send(product);
		} catch(err) {
			res.status(400).send(err);
		}
	},

	delete: async (req, res) => {
		try {
			const product = await productService.deleteProduct(req, res);
			res.status(201).send(product);
		} catch(err) {
			res.status(400).send(err);
		}
	}
}

module.exports = productsController;

