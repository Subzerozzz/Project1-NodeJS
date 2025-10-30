module.exports.list = (req, res) => {
  res.render("admin/pages/tour-list", { title: "Quản lý tour" });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/tour-create", { title: "Tạo tour" });
};

module.exports.trash = (req, res) => {
  res.render("admin/pages/tour-trash", { title: "Thùng rác tour" });
};
