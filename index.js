const express = require("express");
const path = require("path");
require("dotenv").config();
const database = require("./config/database");

const app = express();
const port = 3000;

const adminRoutes = require("./routes/admin/01_index.route");
const clientRoutes = require("./routes/client/01_index.route");

const variableConfig = require("./config/variable");

//Kết nối tới DB
database.connect();

// Set template engine
app.set("view engine", "pug");

//Thiết lập views
app.set("views", path.join(__dirname, "views"));

// Thiết lập thư mục tĩnh
app.use(express.static(path.join(__dirname, "public")));

app.locals.urlAdmin = `${variableConfig.urlAdmin}`;

// Mọi yêu cầu sẽ chạy từ câu lệnh 24 trước
app.use(`/${variableConfig.urlAdmin}`, adminRoutes);
app.use("/", clientRoutes);

app.listen(port, () => {
  console.log(`Dự án đang chạy trên cổng ${port}`);
});

// nguyenduyntn112004/8BXqQPHORJhRzeeI
//mongodb+srv://nguyenduyntn112004:8BXqQPHORJhRzeeI@cluster0.1bk8ypm.mongodb.net/tour-management
