const route = require("express").Router();

const tourController = require("../../controllers/admin/tour.controller");

route.get("/", tourController.list);
route.get("/create", tourController.create);
route.get("/trash", tourController.trash);

module.exports = route;
