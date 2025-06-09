import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useOrderStore } from "../stores/useOrderStore";
import React, { useState } from "react";
import UpdateOrderForm from "./UpdateOrderForm";

const OrderTab = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (order) => {
    if (selectedOrder && selectedOrder._id !== order._id) {
      setIsModalOpen(false);
      setTimeout(() => {
        setSelectedOrder(order);
        setIsModalOpen(true);
      }, 100);
    } else {
      setSelectedOrder(order);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const { deleteOrder, toggleFulfilledOrder, orders } = useOrderStore();

  console.log("orders", orders);

  return (
    <div>
      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Order
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {orders?.map((order) => (
              <tr key={order._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="flex items-center"
                    onClick={() => handleOrderClick(order)}
                  >
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={order.user.avatar}
                        alt={order.user.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {order.user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    ${order.total.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFulfilledOrder(order._id)}
                    className={`p-1 rounded-full ${
                      order.isFulfilled
                        ? "bg-green-400 text-gray-900"
                        : "bg-gray-600 text-gray-300"
                    } hover:bg-green-500 transition-colors duration-200`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      {isModalOpen && (
        <UpdateOrderForm order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default OrderTab;
