const route = require("express").Router();

const tourRoute = require("./tour.route");
const homeRoute = require("./home.route");
const cartRoute = require("./cart.route");

route.use("/", homeRoute);
route.use("/tours", tourRoute);
route.use("/cart", cartRoute);

module.exports = route;
