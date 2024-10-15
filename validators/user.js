const userValidator = {
	validateSignup: (req, res, next) => {
		const { name, email, password, role } = req.body;
		if(!name || !email || !password || !role) return res.status(401).send('All fileds required.');

		const roles = ['retailer', 'customer'];
		if(!roles.includes(role)) return res.status(401).send('Role should be "retailer" or "customer"');

		next();
	},

	validateLogin: (req, res, next) => {
		const {email, password} = req.body;
		if(!email || !password) return res.status(401).send({message: 'Email and Password required'});

		next();
	}
}

module.exports = userValidator;