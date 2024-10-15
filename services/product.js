const { Product } = require('./../models');

const productService = {
	isRetailer: async(user) => {
		return await userService.isRetailer(user);
	},

	setFilters: (req) => {
		const filters = { status: 'opened' };
		if(req.params.id) filters._id = req.params.id;

		const isRetailer = productService.isRetailer(req.user);
		if(isRetailer) filters.userId = req.user._id;
		return filters;
	},

	getProducts: async (req, res) => {
		const products = await Product.find(productService.setFilters(req));
		return products;
	},

	getProductsByIds: async (ids) => {
		console.log("IDS come here:", ids)
		const products = await Product.find({_id: {$in: ids}});
		return products;
	},

	createProduct: async (req, res) => {
		const product = new Product(req.body);
		product.userId = req.user._id;
		await product.save()
		return product;
	},

	getProduct: async (req, res) => {
		const product = await Product.findOne(productService.setFilters(req))
		return product || {message: 'Product doesn\'t exist or you are not authorised.'};
	},

	updateProduct: async (req, res) => {
		const product = await Product.findOneAndUpdate(productService.setFilters(req), req.body, {new: true});
		return product || {message: 'You are not authorised to update this product.'};
	},

	deleteProduct: async (req, res) => {
		const product = await Product.deleteOne(productService.setFilters(req));
		const message = product.deletedCount ? 'Product deleted successfully' : 'You are not authorised to delete this product.';
		return { message };
	}
}

module.exports = productService;