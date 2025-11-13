const route = require("express").Router();

const accountController = require("../../controllers/admin/account.controller");
const accountValidate = require("../../validates/account.validate");
const authMiddleware = require("../../middleware/admin/auth.middleware");

// Login
route.get("/login", accountController.login);
route.post("/login", accountValidate.loginPost, accountController.loginPost);
// Register
route.get("/register", accountController.register);
route.get("/register-initial", accountController.registerInitial);
route.post(
  "/register",
  accountValidate.registerPost,
  accountController.registerPost
);

// Logout
route.post("/logout", accountController.logout);

// Reset password
route.get("/reset-password", accountController.resetPassword);
route.post(
  "/reset-password",
  accountValidate.resetPasswordPost,
  authMiddleware.verifyToken,
  accountController.resetPasswordPost
);

//Otp password
route.get("/otp-password", accountController.otpPassword);
route.post("/otp-password", accountController.otpPasswordPost);

//Forgot password
route.get("/forgot-password", accountController.forgotPassword);
route.post("/forgot-password", accountController.forgotPasswordPost);

module.exports = route;
