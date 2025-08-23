const { Product } = require('../models');
const userService = require('./user');
const cloudinary = require("../config/cloudinary");

const productService = {
	isRetailer: async(user) => {
		return await userService.isRetailer(user);
	},
// this.الاصليه
	// setFilters: async (req) => {
	// 	const filters = { status: 'opened' };
	// 	if(req.params.id) filters._id = req.params.id;
	// 	const isRetailer = await productService.isRetailer(req.user);
	// 	if(isRetailer) filters.userId = req.user._id;
	// 	return filters;
	// },

	// setFilters: async (req) => {
	// 	const filters = {};
	// 	filters.status = req.query.status || 'opened';
	// 	if(req.params.id) filters._id = req.params.id;
	// 	if(req.query.title) filters.title = req.query.title;
	// 	const isRetailer = await productService.isRetailer(req.user);
	// 	if(isRetailer) filters.userId = req.user._id;
	// 	return filters;
	// },

	// setFilters: async (req) => {
	// 	const filters = {};
	// 	filters.status = req.query.status || 'opened';
	// 	if (req.params.id) filters._id = req.params.id;
	// 	if (req.query.title) filters.title = { $regex: req.query.title, $options: 'i' };
	// 	if (req.user) {
	// 		const isRetailer = await productService.isRetailer(req.user);
	// 		if (isRetailer) filters.userId = req.user._id;
	// 	}
	// 	return filters;
	// },
	setFilters: async (req) => {
		const filters = {};

		if(req.query.status) filters.status = req.query.status;
		if(req.query.title) filters.title = req.query.title;

		const isRetailer = await productService.isRetailer(req.user);
		if(isRetailer) filters.userId = req.user._id;

		return filters;
	},


	getProducts: async (req, res) => {
		const products = await Product.find(await productService.setFilters(req)).sort({createdAt: -1});
		return products;
	},

	getProductsByIds: async (ids) => {
		const products = await Product.find({_id: {$in: ids}});
		return products;
	},
	// this.الاصليه
	// createProduct: async (req, res) => {
	// 	const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
	// 	const product = new Product({...req.body, images: imageUrls});
	// 	product.userId = req.user._id;
	// 	await product.save()
	// 	return product;
	// },

	//for Cloudinary
	createProduct: async (req, res) => {
		// رفع الصور كلها على cloudinary
		const uploadPromises = req.files.map(file =>
			cloudinary.uploader.upload(file.path, { folder: "products" })
		);
		const uploadResults = await Promise.all(uploadPromises);
		const imageUrls = uploadResults.map(result => result.secure_url);

		const product = new Product({ ...req.body, images: imageUrls });
		product.userId = req.user._id;
		await product.save();
		return product;
	},

	getProduct: async (req, res) => {
		const product = await Product.findOne(await productService.setFilters(req))
		return product || {message: 'Product doesn\'t exist or you are not authorised.'};
	},
	// this.الاصليه
	// updateProduct: async (req, res) => {
	// 	const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
	// 	const product = await Product.findOneAndUpdate(await productService.setFilters(req), {...req.body, images: imageUrls}, {new: true});
	// 	return product || {message: 'You are not authorised to update this product.'};
	// },

	//for Cloudinary
	// updateProduct: async (req, res) => {
	// 	const uploadPromises = req.files.map(file =>
	// 		cloudinary.uploader.upload(file.path, { folder: "products" })
	// 	);
	// 	const uploadResults = await Promise.all(uploadPromises);
	// 	const imageUrls = uploadResults.map(result => result.secure_url);

	// 	const product = await Product.findOneAndUpdate(
	// 		await productService.setFilters(req),
	// 		{ ...req.body, images: imageUrls },
	// 		{ new: true }
	// 	);
	// 	return product || { message: "You are not authorised to update this product." };
	// },
	
	// لمنع الكراش لو مفيش صور جديدة
	updateProduct: async (req, res) => {
		try {
			let imageUrls;

			// لو فيه صور جديدة
			if (req.files && req.files.length > 0) {
				const uploadPromises = req.files.map(file =>
					cloudinary.uploader.upload(file.path, { folder: "products" })
				);
				const uploadResults = await Promise.all(uploadPromises);
				imageUrls = uploadResults.map(result => result.secure_url);
			}

			// بناء الداتا اللي هتتحدث
			const updateData = { ...req.body };
			if (imageUrls) {
				updateData.images = imageUrls;
			}

			const product = await Product.findOneAndUpdate(
				await productService.setFilters(req),
				updateData,
				{ new: true }
			);

			return product || { message: "You are not authorised to update this product." };
		} catch (err) {
			throw err;
		}
	},



	deleteProduct: async (req, res) => {
		const product = await Product.deleteOne(await productService.setFilters(req));
		const message = product.deletedCount ? 'Product deleted successfully' : 'You are not authorised to delete this product.';
		return { message };
	}
}

module.exports = productService;