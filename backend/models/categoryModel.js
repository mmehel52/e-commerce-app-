const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
