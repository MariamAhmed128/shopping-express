// const nodemailer = require('nodemailer');

// async function sendEmail(to, subject, text) {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: { 
//       user: process.env.EMAIL_USER, 
//       pass: process.env.EMAIL_PASS 
//     }
//   });

//   await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
// }

// module.exports = sendEmail;




















// servises / email.js

// const crypto = require('crypto');
// const User = require('../models/User');

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

// module.exports = { forgotPassword };



