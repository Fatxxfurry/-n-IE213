import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!Array.isArray(user.cartItems)) {
      user.cartItems = [];
    }

    const existingItem = user.cartItems.find(
      (item) => item._id.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ _id: productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!Array.isArray(user.cartItems)) {
      user.cartItems = [];
    }

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item._id.toString() !== productId
      );
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.cartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    if (!req.user || !Array.isArray(req.user.cartItems)) {
      return res.json([]);
    }

    const products = await Product.find({
      _id: { $in: req.user.cartItems.map((item) => item._id) },
    });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem._id.toString() === product._id.toString()
      );
      return { ...product.toJSON(), quantity: item ? item.quantity : 1 };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
