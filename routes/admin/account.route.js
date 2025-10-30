const route = require("express").Router();

const accountController = require("../../controllers/admin/account.controller");

route.get("/login", accountController.login);
route.get("/register", accountController.register);
route.get("/reset-password", accountController.resetPassword);
route.get("/otp-password", accountController.otpPassword);
route.get("/forgot-password", accountController.forgotPassword);

module.exports = route;
