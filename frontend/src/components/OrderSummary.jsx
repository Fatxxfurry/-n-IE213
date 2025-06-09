import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const stripePromise = loadStripe(
  "pk_test_51R6BGkQqINZd5lUJ91n9wmyBYLP0rkgjZfH8mn7YgZBYtnCoKNdrDJI9UHjRrO6U4aG9FgtepNoCpxLQucmmwchA00OVyvKxgr"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const { t } = useTranslation();
  const { user } = useUserStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal;
  const formattedTotal = total;
  const formattedSavings = savings;

  const [address, setAddress] = useState(user?.address[0] || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
      address,
      phoneNumber,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-emerald-400">
        {t("order_summary.title", { defaultValue: "Order summary" })}
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              {t("order_summary.original_price", {
                defaultValue: "Original price",
              })}
            </dt>
            <dd className="text-base font-medium text-white">
                                    {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(formattedSubtotal)}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                {t("order_summary.savings", { defaultValue: "Savings" })}
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(formattedSavings)}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                {t("order_summary.coupon", {
                  defaultValue: "Coupon ({{code}})",
                  code: coupon.code,
                })}
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-white">
              {t("order_summary.total", { defaultValue: "Total" })}
            </dt>
            <dd className="text-base font-bold text-emerald-400">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(formattedTotal)}
            </dd>
          </dl>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-300"
          >
            {t("order_summary.address", { defaultValue: "Address" })}
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            list="suggested-addresses"
            className="block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white"
            placeholder="Enter your address"
            required
          />
          <datalist id="suggested-addresses">
            {user?.address.map((address) => (
              <option key={address} value={address} />
            ))}
          </datalist>

          <label
            htmlFor="phone-number"
            className="block text-sm font-medium text-gray-300"
          >
            {t("order_summary.phone_number", { defaultValue: "Phone number" })}
          </label>
          <input
            type="tel"
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            list="suggested-phone-numbers"
            className="block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white"
            placeholder="Enter your phone number"
            required
          />
          <datalist id="suggested-phone-numbers">
            <option value={user?.phoneNumber} />
          </datalist>
        </div>

        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          {t("order_summary.proceed_to_checkout", {
            defaultValue: "Proceed to Checkout",
          })}
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">
            {t("order_summary.or", { defaultValue: "or" })}
          </span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
            {t("order_summary.continue_shopping", {
              defaultValue: "Continue Shopping",
            })}
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
