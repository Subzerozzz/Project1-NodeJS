const route = require("express").Router();
const multer = require("multer");

const categoryController = require("../../controllers/admin/category.controller");
const CloudinaryHelper = require("../../helpers/admin/cloudinary.helpers");

const upload = multer({ storage: CloudinaryHelper.storage });

//Get List
route.get("/", categoryController.list);
// Create Category
route.get("/create", categoryController.create);
route.post("/create", upload.single("avatar"), categoryController.createPost);
module.exports = route;
