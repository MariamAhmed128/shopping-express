// const passwordResetService = require('../services/passwordReset');

// const passwordResetController = {
//   requestReset: async (req, res) => {
//     try {
//       const result = await passwordResetService.requestPasswordReset(req.body.email);
//       res.status(200).send(result);
//     } catch (err) {
//       res.status(400).send({ error: err.message });
//     }
//   },

//   resetPassword: async (req, res) => {
//     try {
//       const { token, newPassword } = req.body;
//       const result = await passwordResetService.resetPassword(token, newPassword);
//       res.status(200).send(result);
//     } catch (err) {
//       res.status(400).send({ error: err.message });
//     }
//   }
// };

// module.exports = passwordResetController;