const mongoose = require("mongoose");
(slug = require("mongoose-slug-updater")), mongoose.plugin(slug);

const categorySchema = new mongoose.Schema(
  {
    name: String,
    parent: String,
    position: Number,
    status: String,
    avatar: String,
    description: String,
    createdBy: String,
    updatedBy: String,
    slug: { type: String, slug: "name", unique: true },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: String,
    deletedAt: Date,
  },
  {
    timestamps: true, // Tự động sinh ra trường createdAt và updatedAt
  }
);

const category = mongoose.model("Category", categorySchema, "category");

module.exports = category;
