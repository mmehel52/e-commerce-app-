const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const createCategory = expressAsyncHandler(async (req, res) => {
  const newCategory = new Category({
    title: req.body.title,
    picture: req.body.picture,
  });
  const category = await newCategory.save();
  res.send({
    _id: category._id,
    title: category.title,
    picture: category.picture,
  });
});

const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

const getCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.send(category);
  } else {
    res.status(404).send({ message: "Category Not Found" });
  }
});

const updateCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    category.title = req.body.title || category.title;
    category.picture = req.body.picture || category.picture;
    const updatedCategory = await category.save();
    res.send({ message: "Category Updated", user: updatedCategory });
  } else {
    res.status(404).send({ message: "Category Not Found" });
  }
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await Category.findByIdAndDelete(req.params.id);
    res.send({ message: "Category Deleted" });
  } else {
    res.status(404).send({ message: "Category Not Found" });
  }
});

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
  getCategories,
};
