const jwt = require("jsonwebtoken");
const AccountAdmin = require("../../models/account.model");
module.exports.dashboard = async (req, res) => {
  res.render("admin/pages/dashboard", {
    title: "Dashboard",
  });
};
