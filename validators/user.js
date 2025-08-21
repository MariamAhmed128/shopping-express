const userValidator = {
	validateSignup: (req, res, next) => {
		const { name, email, password, role } = req.body;
		if(!name || !email || !password || !role) return res.status(401).send({error: true, message: 'All fields are required'});

		const roles = ['retailer', 'customer'];
		if(!roles.includes(role)) return res.status(401).send({error: true, message: 'Role should be "retailer" or "customer"'});

		next();
	},

	validateLogin: (req, res, next) => {
		const {email, password} = req.body;
		if(!email || !password) return res.status(400).send({error: true, message: 'Email and Password required'});

		next();
	}
}

module.exports = userValidator;