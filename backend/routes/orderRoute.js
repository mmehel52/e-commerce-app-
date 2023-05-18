const express = require("express");
const { isAuth, isAdmin } = require("../util.js");
const {
  getOrders,
  getOrder,
  deleteOrder,
  userAllOrder,
  summaryOrder,
  deliverOrder,
  paidOrder,
  createOrder,
} = require("../controllers/orderController.js");

const orderRouter = express.Router();

orderRouter.get("/", isAuth, isAdmin, getOrders);
orderRouter.get("/summary", isAuth, isAdmin, summaryOrder);
orderRouter.get("/user", isAuth, userAllOrder);
orderRouter.get("/:id", getOrder);
orderRouter.put("/:id/deliver", isAuth, deliverOrder);
orderRouter.put("/:id/paid", isAuth, paidOrder);
orderRouter.delete("/:id", isAuth, isAdmin, deleteOrder);
orderRouter.post("/", createOrder);

module.exports = orderRouter;
