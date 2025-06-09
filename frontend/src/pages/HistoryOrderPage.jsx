import { motion } from "framer-motion";
import OrderList from "../components/OrderList";
import { use, useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";
const HistoryOrderPage = () => {
  const { fetchUserOrders } = useOrderStore();
  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Order History
        </motion.h1>
        <OrderList />
      </div>
    </div>
  );
};

export default HistoryOrderPage;
