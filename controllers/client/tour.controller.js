module.exports.list = async (req, res) => {
  //trả về
  res.render("client/pages/tour-list", {
    pageTitle: "Danh sách tour",
  });
};

module.exports.detail = async (req, res) => {
  //trả về
  res.render("client/pages/tour-detail", {
    pageTitle: "Chi tiết tour",
  });
};
