const AccountAdmin = require("../../models/account.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOtp } = require("../../helpers/admin/generateOtp.helpers");
const ForgotPassword = require("../../models/forgotpassword.model");

const sendMail = require("../../helpers/admin/mailer.helpers");

// Login
module.exports.login = (req, res) => {
  res.render("admin/pages/login", { title: "Đăng nhập" });
};

module.exports.loginPost = async (req, res) => {
  //lấy ra dữ liệu
  const { email, password, remeberPassword } = req.body;
  //tìm tk với email và password
  const findAccount = await AccountAdmin.findOne({
    email: email,
  });
  if (!findAccount) {
    res.json({
      code: "error",
      message: "Tài khoản không tồn tại trong hệ thống !",
    });
    return;
  }
  //so sánh mk
  const checkPassword = await bcrypt.compare(password, findAccount.password);

  if (!checkPassword) {
    res.json({
      code: "error",
      message: "Đăng nhập thất bại !",
    });
    return;
  }
  //check status
  if (findAccount.status != "active") {
    res.json({
      code: "error",
      message: "Tài khoản của bạn chưa được kích hoạt",
    });
    return;
  }

  // Tạo JWT
  const token = jwt.sign(
    {
      id: findAccount.id,
      email: findAccount.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 3600,
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({
    code: "success",
    token: token,
    message: "Đăng nhập thành công!",
  });
};

// Register
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

// Logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    code: "sucess",
    message: "Đăng xuất thành công !",
  });
};

//Reset password

module.exports.resetPassword = (req, res) => {
  res.render("admin/pages/reset-password", { title: "Đổi mật khẩu" });
};

module.exports.resetPasswordPost = async (req, res) => {
  const { newPassword } = req.body;
  // Mã hóa mật khẩu
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  //Lấy ra thông tin trên token
  const token = req.cookies.token;
  const { id, email } = jwt.verify(token, process.env.JWT_SECRET);
  //Cập nhật thông tin password
  await AccountAdmin.updateOne({ email: email }, { password: hashPassword });
  res.json({
    code: "success",
    message: "Cập nhật tài khoản thành công",
  });
};
//Otp Password
module.exports.otpPassword = (req, res) => {
  res.render("admin/pages/otp-password", { title: "Mã OTP" });
};

module.exports.otpPasswordPost = async (req, res) => {
  const { otp } = req.body;

  //check xem mã otp này có tồn tại trong ForgotPassword
  const checkExistOtp = await ForgotPassword.findOne({ otp: otp });
  if (!checkExistOtp) {
    res.json({
      code: "false",
      message: "Mã OTP chưa đúng !",
    });
    return;
  }

  //Tạo JWT với email + otp
  const findAccount = await AccountAdmin.findOne({
    email: checkExistOtp.email,
  });
  // Tạo JWT
  const token = jwt.sign(
    {
      id: findAccount.id,
      email: findAccount.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 3600,
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({
    code: "success",
    message: "Mã OTP đúng",
  });
};

// Forgot password

module.exports.forgotPassword = (req, res) => {
  res.render("admin/pages/forgot-password", { title: "Quên mật khẩu" });
};

module.exports.forgotPasswordPost = async (req, res) => {
  //Lấy ra email và check
  const { email } = req.body;

  const checkExistEmail = await AccountAdmin.findOne({ email: email });
  if (!checkExistEmail) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống !",
    });
    return;
  }
  //Kiểm tra xem đã tồn tại mã OTP chưa
  const checkExistOtp = await ForgotPassword.findOne({ email: email });

  if (checkExistOtp) {
    res.json({
      code: "error",
      message: "Mã OTP đã tồn tại, vui lòng gửi lại sau 5 phút !",
    });
    return;
  }

  //Tạo mã OTP
  const otp = generateOtp(6);

  console.log("Date Now", Date.now());

  //Lưu email và mã OTP, để chút người dùng nhập mã OTP đem đi so sánh
  const newForgotPassword = new ForgotPassword({
    email: email,
    otp: otp,
    expireAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  await newForgotPassword.save();

  //tạo 3 đối tượng email,subject và content
  const subject = "Mã OTP của bạn có hiệu lực trong vòng 5 phút !";
  const content = `Mã OTP của bạn là: ${otp}`;

  sendMail(email, subject, content);

  res.json({ code: "success", message: "Gửi mã OTP thành công" });
};
