module.exports.list = (req, res) => {
  res.render("admin/pages/order-list", { title: "Quản lý đơn hàng" });
};

module.exports.edit = (req, res) => {
  res.render("admin/pages/order-edit", { title: "Chỉnh sửa đơn hàng" });
};
