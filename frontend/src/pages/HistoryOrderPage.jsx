import { motion } from "framer-motion";
import OrderList from "../components/OrderList";
import { use, useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
const HistoryOrderPage = () => {
  const { fetchUserOrders, orders } = useOrderStore();
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
        {orders.length === 0 ? <EmptyCartUI /> : <OrderList />}
      </div>
    </div>
  );
};

export default HistoryOrderPage;
const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold ">Your order history is empty</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} ordered anything.
    </p>
    <Link
      className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
      to="/"
    >
      Start Shopping
    </Link>
  </motion.div>
);
