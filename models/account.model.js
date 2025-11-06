const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountAdminSchema = {
  fullName: String,
  email: String,
  password: String,
  status: String,
};

const AccountAdmin = mongoose.model(
  "AccountAdmin",
  accountAdminSchema,
  "account-admin"
);

module.exports = AccountAdmin;
