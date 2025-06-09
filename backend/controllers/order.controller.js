import Order from "../models/order.model.js";
export const getUserOrders = async (req, res) => {
  try {
    const user = req.user;
    const orders = await Order.find({ user: user._id })
      .populate("products.product")
      .populate("user", "name email");

    res.json(orders);
  } catch (error) {
    console.log("Error in getUserOrders controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.json(orders);
  } catch (error) {
    console.log("Error in getAllOrders controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, phoneNumber, status } = req.body;
    const updates = {};
    if (address !== null) {
      updates.address = address;
    }
    if (phoneNumber !== null) {
      updates.phoneNumber = phoneNumber;
    }
    if (status !== null) {
      updates.status = status;
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate("user", "name email")
      .populate("products.product");
    res.json(updatedOrder);
  } catch (error) {
    console.log("Error in updateOrder controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
