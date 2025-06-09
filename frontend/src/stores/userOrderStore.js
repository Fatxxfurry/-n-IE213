import { create } from "zustand";
import axios from "../lib/axios";

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,

  getAllOrders: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/api/order");
      set({ orders: response.data, loading: false });
    } catch (error) {
      console.log("Error in getAllOrders:", error.message);
      set({ loading: false });
    }
  },
  fetchUserOrders: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/api/order/user");
      set({ orders: response.data, loading: false });
    } catch (error) {
      console.log("Error in fetchUserOrders:", error.message);
      set({ loading: false });
    }
  },
}));
