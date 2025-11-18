const AccountAdmin = require("../../models/account.model");
const CategoryModel = require("../../models/category.model");
module.exports.list = async (req, res) => {
  //Lấy ra danh sách các danh mục
  const listCategoryRaw = await CategoryModel.find().lean();

  const listCategory = await Promise.all(
    listCategoryRaw.map(async (item) => {
      const date = new Date(item.createdAt).toISOString().slice(0, 10);
      const time = new Date(item.createdAt).toISOString().slice(11, 16);

      const nameCreatedBy = await AccountAdmin.findOne({ _id: item.createdBy });
      const nameUpdatedBy = await AccountAdmin.findOne({ _id: item.updatedBy });
      return {
        ...item,
        time: time,
        date: date,
        nameCreatedBy: nameCreatedBy?.fullName,
        nameUpdatedBy: nameUpdatedBy?.fullName,
      };
    })
  );
  res.render("admin/pages/category-list", {
    title: "Quản lý danh mục",
    listCategory: listCategory,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/category-create", { title: "Tạo danh mục" });
};

module.exports.createPost = async (req, res) => {
  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;

  //set giá trị cho avatar
  if (req.file) {
    req.body.avatar = req.file.path;
  }

  //set giá trị cho position
  if (req.body.position != "") {
    req.body.position = parseInt(req.body.position);
  } else req.body.position = (await CategoryModel.countDocuments()) + 1;

  // tạo đối tượng
  const newCategory = new CategoryModel(req.body);
  await newCategory.save();

  res.json({
    code: "success",
    message: "Tạo danh mục thành công !",
  });
};
