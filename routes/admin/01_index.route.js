const route = require("express").Router();

const accountRoute = require("./account.route");
const dashboardRoute = require("./dashboard.route");
const categoryRoute = require("./category.route");
const tourRoute = require("./tour.route");
const orderRoute = require("./order.route");
const userRoute = require("./user.route");
const contactRoute = require("./contact.route");
const settingRoute = require("./setting.route");
const profileRoute = require("./profile.route");

route.use("/account", accountRoute);
route.use("/dashboard", dashboardRoute);
route.use("/category", categoryRoute);
route.use("/tour", tourRoute);
route.use("/order", orderRoute);
route.use("/user", userRoute);
route.use("/contact", contactRoute);
route.use("/setting", settingRoute);
route.use("/profile", profileRoute);
route.use((req, res) => {
  res.status(404).render("admin/pages/error-404", { title: "Not Found" });
});

module.exports = route;
