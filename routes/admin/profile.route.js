const route = require("express").Router();

const profileController = require("../../controllers/admin/profile.controller");

route.get("/edit", profileController.edit);
route.get("/change-password", profileController.changePassword);

module.exports = route;
