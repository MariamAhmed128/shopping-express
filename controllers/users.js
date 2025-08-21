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
			const { email, password } = req.body;
			const user = await userService.signin(email, password); 
			res.status(200).send(user);  
		} catch(err) {
			res.status(400).send({ error: true, message: err.message || err });
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
