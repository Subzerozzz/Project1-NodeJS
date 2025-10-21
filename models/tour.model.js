const mongoose = require("mongoose");

//Tạo Model
const Tour = mongoose.model("Tour", {
  name: String,
  vehicle: String,
});

module.exports = Tour;
