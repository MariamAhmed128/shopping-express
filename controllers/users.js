const userService = require('../services/user.js');


const usersController = {
	signup: async (req, res) => {
		try {
			const user = await userService.createUser(req);
			res.status(201).send({message: 'Thank you for signing up!!', info: user});
		} catch(err) {
			res.status(400).send(err);
		}
	},

	signin: async (req, res) => {
		try {
			const user = await userService.signin(req);
			res.status(201).send(user);
		} catch(err) {
			res.status(400).send(err);
		}
	},

	index: async (req, res) => {
		try {
			const users = await userService.fetchUsers();
			res.status(201).send(users);
		} catch(err) {
			res.status(400).send(err);
		}
	}
}

module.exports = usersController;
