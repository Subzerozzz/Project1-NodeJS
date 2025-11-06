const route = require("express").Router();

const accountController = require("../../controllers/admin/account.controller");
const accountValidate = require("../../validates/account.validate");

route.get("/login", accountController.login);
// Register
route.get("/register", accountController.register);
route.get("/register-initial", accountController.registerInitial);
route.post(
  "/register",
  accountValidate.registerPost,
  accountController.registerPost
);

// Password
route.get("/reset-password", accountController.resetPassword);
route.get("/otp-password", accountController.otpPassword);
route.get("/forgot-password", accountController.forgotPassword);

module.exports = route;
