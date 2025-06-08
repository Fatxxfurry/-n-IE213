// frontend/src/stores/useCartStore.js
import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons");
      set({ coupon: response.data });
    } catch (error) {
      console.error("Error fetching coupon:", error.message);
      toast.error(error.response?.data?.message || "Failed to fetch coupon");
    }
  },

  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupons/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      console.error("Error applying coupon:", error.message);
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      const cartData = Array.isArray(res.data) ? res.data : [];
      set({ cart: cartData });
      get().calculateTotals();
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      toast.error(
        error.response?.data?.message || "Failed to fetch cart items"
      );
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },

  addToCart: async (product) => {
    try {
      if (!product || !product._id) {
        console.error("Invalid product data:", product);
        toast.error("Invalid product data", { id: "invalid-product" });
        return;
      }
      const quantity = product.quantity || 1; // Lấy số lượng, mặc định là 1
      console.log("Adding to cart:", product._id, "Quantity:", quantity);
      await axios.post("/cart", { productId: product._id, quantity });
      toast.success("Product added to cart");
      await get().getCartItems();
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      toast.error(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete("/cart", { data: { productId } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));
      toast.success("Product removed from cart");
      get().calculateTotals();
    } catch (error) {
      console.error("Error removing from cart:", error.message);
      toast.error(
        error.response?.data?.message || "Failed to remove product from cart"
      );
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      console.log("Updating quantity for product:", productId, "to:", quantity);
      if (quantity === 0) {
        await get().removeFromCart(productId);
        return;
      }
      await axios.put(`/cart/${productId}`, { quantity });
      await get().getCartItems();
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Error updating quantity:", error.message);
      if (error.code === "ECONNREFUSED") {
        toast.error(
          "Cannot connect to server. Please check if the backend is running."
        );
      } else {
        toast.error(
          error.response?.data?.message || "Failed to update quantity"
        );
      }
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );
    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
