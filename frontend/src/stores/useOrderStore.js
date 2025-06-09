import { create } from "zustand";
import axios from "../lib/axios";
import { updateOrder } from "../../../backend/controllers/order.controller";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,

  getAllOrders: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/order");
      set({ orders: response.data, loading: false });
    } catch (error) {
      console.log("Error in getAllOrders:", error.message);
      set({ loading: false });
    }
  },
  fetchUserOrders: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/order/user");
      set({ orders: response.data, loading: false });
    } catch (error) {
      console.log("Error in fetchUserOrders:", error.message);
      set({ loading: false });
    }
  },
  updateOrder: async (orderId, updatedOrder) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/order/${orderId}`, updatedOrder);
      const { orders } = get();
      const index = orders.findIndex((order) => order._id === orderId);
      if (index !== -1) {
        orders[index] = response.data;
      }
      set({ orders, loading: false });
    } catch (error) {
      console.log("Error in updateOrder:", error.message);
      set({ loading: false });
    }
  },
}));
