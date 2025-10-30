module.exports.list = (req, res) => {
  res.render("admin/pages/category-list", { title: "Quản lý danh mục" });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/category-create", { title: "Tạo danh mục" });
};
