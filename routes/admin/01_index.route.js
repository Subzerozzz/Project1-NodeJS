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

const authMiddleware = require("../../middleware/admin/auth.middleware");

route.use("/account", accountRoute);
route.use("/dashboard", authMiddleware.verifyToken, dashboardRoute);
route.use("/category", authMiddleware.verifyToken, categoryRoute);
route.use("/tour", authMiddleware.verifyToken, tourRoute);
route.use("/order", authMiddleware.verifyToken, orderRoute);
route.use("/user", authMiddleware.verifyToken, userRoute);
route.use("/contact", authMiddleware.verifyToken, contactRoute);
route.use("/setting", authMiddleware.verifyToken, settingRoute);
route.use("/profile", authMiddleware.verifyToken, profileRoute);
route.use((req, res) => {
  res.status(404).render("admin/pages/error-404", { title: "Not Found" });
});

module.exports = route;
