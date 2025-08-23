// // const crypto = require('crypto');
// // const PasswordReset = require('../models/PasswordReset');
// // const User = require('../models/User');
// // const sendEmail = require('./email');

// // async function requestPasswordReset(email) {
// //   const user = await User.findOne({ email });
// //   if (!user) throw new Error('User not found');

// //   const token = crypto.randomBytes(32).toString('hex');
// //   const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 ساعة

// //   await PasswordReset.create({ userId: user._id, token, expiresAt });

// //   const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
// //   await sendEmail(user.email, 'Password Reset', `Click here: ${resetLink}`);

// //   return { message: 'Reset email sent successfully' };
// // }

// // async function resetPassword(token, newPassword) {
// //   const record = await PasswordReset.findOne({ token });
// //   if (!record) throw new Error('Invalid or expired token');
// //   if (record.expiresAt < new Date()) throw new Error('Token expired');

// //   const user = await User.findById(record.userId);
// //   if (!user) throw new Error('User not found');

// //   user.password = newPassword; // الـ hash شغّال عندك في موديل User
// //   await user.save();

// //   await PasswordReset.deleteOne({ _id: record._id });

// //   return { message: 'Password reset successfully' };
// // }

// // module.exports = { requestPasswordReset, resetPassword };












// // services // passwordReset.js


// const crypto = require('crypto');
// const User = require('../models/User');
// const bcryptjs = require('bcryptjs');

// // دالة إنشاء توكن لإعادة تعيين الباسورد
// const forgotPassword = async (email) => {
//     const user = await User.findOne({ email });
//     if (!user) throw new Error("User not found");

//     const token = crypto.randomBytes(20).toString('hex');

//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 3600000; // ساعة
//     await user.save();

//     return {
//         message: "Reset token generated",
//         resetToken: token,
//         resetLink: `http://localhost:5000/reset-password/${token}`
//     };
// };

// // دالة إعادة تعيين الباسورد
// const resetPassword = async (token, newPassword) => {
//     const user = await User.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) throw new Error("Invalid or expired token");

//     user.password = await bcryptjs.hash(newPassword, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     return { message: "Password has been reset successfully" };
// };

// // تصدير الدالتين
// module.exports = { forgotPassword, resetPassword };
