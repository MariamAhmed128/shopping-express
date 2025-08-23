const userService = require('./user');
const productService = require('./product');
const orderService = require('./order');
const passwordReset = require('./passwordReset');
const email = require('./email')
module.exports = {
	userService,
	productService,
	orderService,
	passwordReset,
	email
};
