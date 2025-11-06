const AccountAdmin = require("../../models/account.model");
const bcrypt = require("bcryptjs");

module.exports.login = (req, res) => {
  res.render("admin/pages/login", { title: "Đăng nhập" });
};

module.exports.register = (req, res) => {
  res.render("admin/pages/register", { title: "Đăng ký" });
};

module.exports.registerInitial = (req, res) => {
  res.render("admin/pages/register-initial", {
    title: "Tạo tài khoản thành công",
  });
};

module.exports.registerPost = async (req, res) => {
  const { fullName, email, password } = req.body;

  //check exist account
  const existAccount = await AccountAdmin.findOne({ email: email });
  // Mã hóa mật khẩu
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  if (!existAccount) {
    const newAccount = {
      fullName: fullName,
      email: email,
      password: hashPassword,
      status: "initial",
    };
    await AccountAdmin.create(newAccount);
    //trả ra notification sucess
    res.json({
      code: "success",
      message: "Đăng ký thành công tài khoản",
    });
  } else {
    res.json({
      code: "Error",
      message: "Tài khoản đã tồn tại trong hệ thống",
    });
  }
};

module.exports.resetPassword = (req, res) => {
  res.render("admin/pages/reset-password", { title: "Đổi mật khẩu" });
};

module.exports.otpPassword = (req, res) => {
  res.render("admin/pages/otp-password", { title: "Mã OTP" });
};

module.exports.forgotPassword = (req, res) => {
  res.render("admin/pages/forgot-password", { title: "Quên mật khẩu" });
};
