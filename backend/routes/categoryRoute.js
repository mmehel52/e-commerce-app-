const express = require("express");
const {
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../controllers/categoryController.js");

const { isAuth, isAdmin } = require("../util.js");

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.put("/:id", isAuth, isAdmin, updateCategory);
categoryRouter.delete("/:id", isAuth, isAdmin, deleteCategory);
categoryRouter.post("/", isAuth, isAdmin, createCategory);

module.exports = categoryRouter;
