import Order from "../models/order.model.js";
export const getUserOrders = async (req, res) => {
  try {
    const user = req.user;
    const orders = await Order.find({ user: user._id }).populate("products.product");

    res.json(orders);
  } catch (error) {
    console.log("Error in getUserOrders controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("products.product");

    res.json(orders);
  } catch (error) {
    console.log("Error in getAllOrders controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
