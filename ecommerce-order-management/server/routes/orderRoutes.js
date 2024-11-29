const express = require("express");
const { addOrder, getUserOrders } = require("../controllers/orderController");
const router = express.Router();

router.post("/", addOrder);
router.get("/:userId", getUserOrders);

module.exports = router;
