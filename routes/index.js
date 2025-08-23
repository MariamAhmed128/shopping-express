// routes/index.js

const userRouter = require('./users');
const productRouter = require('./products');
const orderRouter = require('./orders');
const passwordResetRoutes = require('./passwordResetRoutes');

module.exports = {
	userRouter,
	productRouter,
	orderRouter,
	passwordResetRoutes
};
