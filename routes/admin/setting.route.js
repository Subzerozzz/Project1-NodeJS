const route = require("express").Router();

const settingController = require("../../controllers/admin/setting.controller");

route.get("/", settingController.list);
route.get("/website-info", settingController.websiteInfo);
route.get("/role/list", settingController.roleList);
route.get("/role/create", settingController.roleCreate);
route.get("/account-admin/list", settingController.accountAdmin);
route.get("/account-admin/create", settingController.accountAdminCreate);
module.exports = route;
