const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

//Thiết lập views
app.set("views", path.join(__dirname, "views"));
// Set template engine
app.set("view engine", "pug");

// Thiết lập thư mục tĩnh
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("client/pages/home", {
    pageTitle: "Trang chủ",
    message: "Trang chủ",
  });
});

app.get("/tour-list", (req, res) => {
  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour",
    message: "Danh sách tour",
  });
});

app.listen(port, () => {
  console.log(`Dự án đang chạy trên cổng ${port}`);
});
