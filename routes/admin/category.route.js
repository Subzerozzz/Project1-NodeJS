const route = require("express").Router();

const categoryController = require("../../controllers/admin/category.controller");

route.get("/", categoryController.list);
route.get("/create", categoryController.create);

module.exports = route;
