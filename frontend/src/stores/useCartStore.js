import { create } from "zustand";
import { toast } from "react-hot-toast";

// Giả lập danh sách mã giảm giá tĩnh
const mockCoupons = [
  { code: "SAVE10", discountPercentage: 10 },
  { code: "SAVE20", discountPercentage: 20 },
];

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      // Giả lập lấy mã giảm giá từ danh sách tĩnh
      const coupon = mockCoupons[0] || null; // Lấy mã đầu tiên hoặc null
      set({ coupon });
    } catch (error) {
      console.error("Error fetching coupon:", error);
      toast.error("Failed to fetch coupon");
    }
  },

  applyCoupon: async (code) => {
    try {
      // Kiểm tra mã giảm giá trong danh sách tĩnh
      const coupon = mockCoupons.find((c) => c.code === code);
      if (!coupon) {
        throw new Error("Invalid coupon code");
      }
      set({ coupon, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.message || "Failed to apply coupon");
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  getCartItems: async () => {
    try {
      // Lấy giỏ hàng từ local storage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      set({ cart });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error("Failed to fetch cart items");
    }
  },

  clearCart: async () => {
    // Xóa giỏ hàng khỏi local storage
    localStorage.removeItem("cart");
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
    toast.success("Cart cleared");
  },

  addToCart: async (product) => {
    try {
      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        let newCart;
        if (existingItem) {
          newCart = prevState.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newCart = [...prevState.cart, { ...product, quantity: 1 }];
        }
        // Lưu giỏ hàng vào local storage
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { cart: newCart };
      });
      get().calculateTotals();
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  },

  removeFromCart: async (productId) => {
    try {
      set((prevState) => {
        const newCart = prevState.cart.filter((item) => item._id !== productId);
        // Cập nhật local storage
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { cart: newCart };
      });
      get().calculateTotals();
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error("Failed to remove product from cart");
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity === 0) {
        get().removeFromCart(productId);
        return;
      }

      set((prevState) => {
        const newCart = prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );
        // Cập nhật local storage
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { cart: newCart };
      });
      get().calculateTotals();
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;

    if (coupon && get().isCouponApplied) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
