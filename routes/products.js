const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');
const authenticate = require('../middleware/isAuthorised');
const uploader = require('../middleware/upload');

router.get('/products', async (req, res) => {
	await productsController.index(req, res);
});

router.get('/products/:id', async (req, res) => {
	await productsController.getProduct(req, res);
});

router.use(authenticate.isAuthorised);

router.post('/products', authenticate.isRetailer, uploader.fileCheck, async (req, res) => {
	await productsController.create(req, res);
});
// router.post('/products',authenticate.isAuthorised,isRetailer,uploader.fileCheck,productsController.create)

router.patch('/products/:id', authenticate.isRetailer, uploader.fileCheck, async (req, res) => {
	await productsController.update(req, res);
});

router.delete('/products/:id', authenticate.isRetailer, async (req, res) => {
	await productsController.delete(req, res);
});

module.exports = router;