const express = require("express");
const {
  createOrder,
  getOrders,
  getOrder,
  deliverOrder,
  orderMine,
  deleteOrder,
  summaryOrder,
  paidOrder,
} = require("../controllers/orderController.js");
const { isAuth, isAdmin } = require("../util.js");
const orderRouter = express.Router();

orderRouter.post("/", isAuth, createOrder);
orderRouter.get("/", isAuth, isAdmin, getOrders);
orderRouter.get("/:id", isAuth, getOrder);
orderRouter.delete("/:id", isAuth, isAdmin, deleteOrder);
orderRouter.put("/:id/deliver", isAuth, isAdmin, deliverOrder);
orderRouter.put("/:id/paid", isAuth, paidOrder);
orderRouter.get("/mine", isAuth, orderMine);
orderRouter.get("/summary", isAuth, isAdmin, summaryOrder);

module.exports = orderRouter;
