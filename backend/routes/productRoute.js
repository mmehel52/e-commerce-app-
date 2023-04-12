const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  searchProducts,
  createReview,
  getProducts,
  addColour,
} = require("../controllers/productController");
const { isAuth, isAdmin } = require("../util.js");

const productRouter = express.Router();

productRouter.get("/search", searchProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", isAuth, isAdmin, updateProduct);
productRouter.delete("/:id", isAuth, isAdmin, deleteProduct);
productRouter.post("/", isAuth, isAdmin, createProduct);
productRouter.post("/:id/reviews", isAuth, createReview);
productRouter.post("/:id/colours", isAuth, isAdmin, addColour);
productRouter.get("/", getProducts);

module.exports = productRouter;
