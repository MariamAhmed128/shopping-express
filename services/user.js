const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../models');

const userService = {
	createUser: async (req) => {
		const {name, email, role} = req.body;
		const user = new User(req.body);
		user.password = await bcrypt.hash(req.body.password, 10);
		await user.save();
		
		return {name, email, role};
	},

	// signin: async (req) => {
	// 	const {email, password} = req.body;
	// 	const user = await User.findOne({ email: email })
	// 	if(!user) return {error: true, message: `User with ${email} doesn't exist`};
	// 	if(!(await bcrypt.compare(password, user.password))) return {error: true, message: 'Email or Password is not correct!'}

	// 	const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1 day'});
	// 	return {user, token}
	// },
	signin: async (email, password) => {
		const user = await User.findOne({ email: email });
		if (!user) {
			return { error: true, message: `User with ${email} doesn't exist` };
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return { error: true, message: "Email or Password is not correct!" };
		}

		const token = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET || "mysecretkey",
			{ expiresIn: "1d" }
		);

		user.tokens.push({ token });
		await user.save();

		return {
			message: "Login successful",
			user: {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			tokens: user.tokens
			}
		};
	},

	fetchUsers: async () => {
		const users = await User.find().select(['name', 'email', 'createdAt', 'updatedAt']);
		return users;
	},

	fetchUserById: async (id) => {
		const user = await User.findById(id);
		return user;
	},

	isRetailer: async (user) => {
		if(!user) return false;

		return user.role === 'retailer';
	},

	isCustomer: async (user) => {
		if(!user) return false;

		return user.role === 'customer';
	}
}

module.exports = userService;
