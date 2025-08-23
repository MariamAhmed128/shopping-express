// // const express = require('express');
// // const router = express.Router();
// // const passwordResetController = require('../controllers/passwordReset');

// // // ✅ دول بس routes reset
// // router.post('/request-reset', passwordResetController.requestReset);
// // router.post('/reset-password', passwordResetController.resetPassword);

// // module.exports = router;



















// // const express = require('express');
// // const crypto = require('crypto');
// // const User = require('../models/User');

// // const router = express.Router();

// // router.post('/forgot-password', async (req, res) => {
// //     const { email } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     // إنشاء توكن عشوائي
// //     const token = crypto.randomBytes(20).toString('hex');

// //     // تخزين التوكن وانتهاء صلاحيته (مثلاً 1 ساعة)
// //     user.resetPasswordToken = token;
// //     user.resetPasswordExpires = Date.now() + 3600000;
// //     await user.save();

// //     // هنا عادةً تبعت ايميل، لكن للتجربة في Postman نرجع التوكن
// //     res.json({
// //         message: "Reset password token generated",
// //         resetToken: token,
// //         resetLink: `http://localhost:5000/reset-password/${token}`
// //     });
// // });

// // module.exports = router;












// // routes/passwordResetRouter.js
// const express = require('express');
// const { forgotPassword, resetPassword } = require('../services/passwordReset');


// const router = express.Router();

// // طلب نسيان كلمة المرور
// router.post('/forgot-password', async (req, res) => {
// 	try {
// 		const result = await forgotPassword(req.body.email);
// 		res.json(result);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

// // إعادة تعيين كلمة المرور
// router.post('/reset-password/:token', async (req, res) => {
// 	try {
// 		const result = await resetPassword(req.params.token, req.body.newPassword);
// 		res.json(result);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// });

// module.exports = router;
