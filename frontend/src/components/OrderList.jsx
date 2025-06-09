import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import React, { useState } from "react";
import { useOrderStore } from "../stores/useOrderStore.js";
import UpdateOrderForm from "./UpdateOrderForm.jsx";
import { useEffect } from "react";
const OrderList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [statusFilter, setStatusFilter] = useState("");

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

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const { orders, fetchUserOrders } = useOrderStore();
  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);
  const sortedFilteredOrders = React.useMemo(() => {
    if (!orders) return [];
    const filteredOrders = orders.filter((order) => {
      if (statusFilter === "") return true;
      return order.status === statusFilter;
    });
    return [...filteredOrders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [orders, sortConfig, statusFilter]);

  return (
    <div>
      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between p-4">
          <select
            className="bg-gray-700 text-white p-2 rounded"
            onChange={handleFilter}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
            <option value="refunded">Refunded</option>
            <option value="shipping">Shipping</option>
            <option value="processing">Processing</option>
          </select>
          <div className="flex space-x-2">
            <button
              className="bg-emerald-500 text-white p-2 rounded"
              onClick={() => handleSort("createdAt")}
            >
              Sort by Date
            </button>
            <button
              className="bg-emerald-500 text-white p-2 rounded"
              onClick={() => handleSort("totalAmount")}
            >
              Sort by Total Price
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                User Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Total Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Date Order
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {sortedFilteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="text-sm font-medium text-white"
                    onClick={() => handleOrderClick(order)}
                  >
                    {order._id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{order.user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalAmount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{order.status}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
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

export default OrderList;
