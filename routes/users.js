const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');
const userValidator = require('../validators/user');
const authenticate = require('../middleware/isAuthorised');

router.post('/signup', userValidator.validateSignup, async (req, res) => {
	await usersController.signup(req, res);
})

router.post('/login', userValidator.validateLogin, async (req, res) => {
	await usersController.signin(req, res);
});

router.get('/users', authenticate.isAuthorised, async (req, res) => {
	await usersController.index(req, res);
});

module.exports = router;
