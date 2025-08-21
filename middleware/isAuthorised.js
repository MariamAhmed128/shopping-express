const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = {
	isAuthorised: async (req, res, next) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if(!token) return res.status(401).send('Token is required');
		
		jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
			if (err) return res.sendStatus(403);

			const currentUser = await userService.fetchUserById(user.id);

			req.user = currentUser;
			next();
		});
	},

	isRetailer: async (req, res, next) => {
		const isRetailer = await userService.isRetailer(req.user);
		if(!isRetailer) return res.status(401).send('You are not authorised!');

		next();
	},

	isCustomer: async (req, res, next) => {
		const isCustomer = await userService.isCustomer(req.user);
		if(!isCustomer) return res.status(401).send('You are not authorised!');

		next();
	}
}

module.exports = authenticate;
