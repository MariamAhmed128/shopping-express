const express = require('express');
const router = express.Router();
const { ordersController } = require('../controllers');
const authenticate = require('../middleware/isAuthorised');

router.use(authenticate.isAuthorised, authenticate.isCustomer);

router.get('/orders', async (req, res) => {
	await ordersController.index(req, res);
});

router.get('/checkout', async (req, res) => {
	await ordersController.checkout(req, res);
});

router.post('/add_cart/:productId', async (req, res) => {
	await ordersController.addCart(req, res);
});

router.post('/remove_cart/:productId', async (req, res) => {
	await ordersController.removeCart(req, res);
});

router.post('/purchage', async (req, res) => {
	await ordersController.purchage(req, res);
});

module.exports = router;