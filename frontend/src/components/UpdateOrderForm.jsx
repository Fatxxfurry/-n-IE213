import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOrderStore } from "../stores/useOrderStore";
import { useUserStore } from "../stores/useUserStore";

const UpdateOrderForm = ({ order, onClose }) => {
  const [updatedOrder, setUpdatedOrder] = useState({ ...order });
  const { updateOrder } = useOrderStore();
  const { user } = useUserStore();
  const isAdmin = user?.role === "admin";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrder(order._id, updatedOrder);
      onClose();
    } catch {
      console.log("error updating order");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ maxWidth: "100vw", maxHeight: "100vh" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-200"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
          Update Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={updatedOrder.address}
              onChange={(e) =>
                setUpdatedOrder({ ...updatedOrder, address: e.target.value })
              }
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={updatedOrder.phoneNumber}
              onChange={(e) =>
                setUpdatedOrder({
                  ...updatedOrder,
                  phoneNumber: e.target.value,
                })
              }
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div className="space-y-4">
            {updatedOrder.products.map((product, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.product.image}
                    alt={product.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-white">{product.name}</h3>
                    <p className="text-gray-400">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}{" "}
                      x {product.quantity}
                    </p>
                    <p className="text-white font-semibold">
                      Total:{" "}
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price * product.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <label
              htmlFor="total"
              className="block text-sm font-medium text-gray-300"
            >
              Total
            </label>
            <span className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(updatedOrder.totalAmount)}
            </span>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={updatedOrder.status}
              onChange={(e) =>
                setUpdatedOrder({ ...updatedOrder, status: e.target.value })
              }
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="">Select a status</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="delivered">Delivered</option>
              <option value="returned">Returned</option>
              <option value="refunded">Refunded</option>
              <option value="shipping" disabled={!isAdmin}>
                Shipping
              </option>
              <option value="processing" disabled={!isAdmin}>
                Processing
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full py-3 px-5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 rounded-lg"
          >
            Update Order
          </button>
        </form>
      </div>
    </motion.div>
  );
};
export default UpdateOrderForm;
