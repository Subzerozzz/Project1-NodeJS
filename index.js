const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

//Kết nối tới DB
mongoose.connect(process.env.DATABASE);

//Thiết lập views
app.set("views", path.join(__dirname, "views"));
// Set template engine
app.set("view engine", "pug");

// Thiết lập thư mục tĩnh
app.use(express.static(path.join(__dirname, "public")));

const Tour = require("./models/tour.model");

app.get("/", (req, res) => {
  res.render("client/pages/home", {
    pageTitle: "Trang chủ",
  });
});

app.get("/tours", async (req, res) => {
  //lấy ra list tour
  const listTour = await Tour.find({});
  console.log(listTour);

  //trả về
  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour",
    tours: listTour,
  });
});

app.listen(port, () => {
  console.log(`Dự án đang chạy trên cổng ${port}`);
});

// nguyenduyntn112004/8BXqQPHORJhRzeeI
//mongodb+srv://nguyenduyntn112004:8BXqQPHORJhRzeeI@cluster0.1bk8ypm.mongodb.net/tour-management
