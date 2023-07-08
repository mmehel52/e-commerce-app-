const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const Category = require("../models/categoryModel");

const createOrder = expressAsyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);
  const order = await newOrder.save();
  res.send({
    order,
  });
});

const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name");
  res.send(orders);
});
const getOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const summaryOrder = expressAsyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);
  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      },
    },
  ]);
  // const dailyOrders = await Order.aggregate([
  //   {
  //     $group: {
  //       _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
  //       orders: { $sum: 1 },
  //       sales: { $sum: "$totalPrice" },
  //     },
  //   },
  //   { $sort: { _id: 1 } },
  // ]);
  const Categories = await Category.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  const Products = await Product.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  res.send({ users, orders, Categories, Products });
});

const deliverOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404).send({ message: "Order Not Found" });
  } else if (!order.isPaid) {
    res.status(404).send({ message: "Not Paid " });
  } else {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.send({ message: "Order Delivered" });
  }
});
const paidOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();
    res.send({ message: "Order Paid" });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const orderMine = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

const deleteOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await Order.findByIdAndDelete(req.params.id);
    res.send({ message: "Order Deleted" });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
module.exports = {
  createOrder,
  getOrders,
  getOrder,
  deliverOrder,
  orderMine,
  deleteOrder,
  summaryOrder,
  paidOrder,
};
