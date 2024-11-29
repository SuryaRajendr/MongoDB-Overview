const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");

exports.addOrder = async (req, res) => {
  try {
    const { userId, orderItems, totalAmount } = req.body;
    const order = await Order.create({ userId, totalAmount });

    for (const item of orderItems) {
      await OrderItem.create({ ...item, orderId: order._id });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate("userId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
