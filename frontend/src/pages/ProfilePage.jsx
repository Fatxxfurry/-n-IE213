import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader,
  MapPinHouse,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: [],
  });
  const [newAddress, setNewAddress] = useState("");
  const { updateProfile, loading, user, checkAuth } = useUserStore();
  const { t } = useTranslation();

  useEffect(() => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      phoneNumber: user.phoneNumber,
      address: [...user.address],
    });
  }, [user]);

  const handleDelete = (index) => {
    const updatedAddresses = [...formData.address];
    updatedAddresses.splice(index, 1);
    setFormData({ ...formData, address: updatedAddresses });
  };

  const handleAdd = () => {
    if (newAddress.trim() === "") return;
    setFormData({
      ...formData,
      address: [...formData.address, newAddress],
    });
    setNewAddress("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, id: user.id });
    await updateProfile(formData);
    checkAuth();
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
          {t("profile_page.title", { defaultValue: "Update your account" })}
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                {t("profile_page.name_label", { defaultValue: "Full name" })}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder={t("profile_page.name_placeholder", {
                    defaultValue: "John Doe",
                  })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                {t("profile_page.email_label", {
                  defaultValue: "Email address",
                })}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder={t("profile_page.email_placeholder", {
                    defaultValue: "you@example.com",
                  })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                {t("profile_page.password_label", {
                  defaultValue: "New Password",
                })}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder={t("profile_page.password_placeholder", {
                    defaultValue: "New Password",
                  })}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                {t("profile_page.confirm_password_label", {
                  defaultValue: "Confirm Password",
                })}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder={t("profile_page.confirm_password_placeholder", {
                    defaultValue: "Confirm New Password",
                  })}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-300"
              >
                {t("profile_page.phone_number_label", {
                  defaultValue: "Phone number",
                })}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder={t("profile_page.phone_number_placeholder", {
                    defaultValue: "1234567890",
                  })}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
              >
                {t("profile_page.address_label", { defaultValue: "Address" })}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinHouse
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="block w-full pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus-within:border focus-within:border-emerald-500 sm:text-sm flex items-center justify-between">
                  <input
                    id="address"
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="block w-full py-2 bg-gray-700 border border-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                    placeholder={t(
                      "profile_page.confirm_password_placeholder",
                      {
                        defaultValue: "Enter your new address",
                      }
                    )}
                  />
                  <button
                    className="bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 shrink-0"
                    onClick={() => handleAdd()}
                  >
                    Thêm địa chỉ
                  </button>
                </div>
              </div>
              <ul className="mt-1 relative rounded-md shadow-sm">
                {formData.address.map((address, index) => (
                  <li
                    key={index}
                    className="mt-1 relative rounded-md shadow-sm"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinHouse
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm flex items-center justify-between">
                      {address}
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 shrink-0"
                        onClick={() => handleDelete(index)}
                      >
                        Xóa
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  {t("profile_page.loading", { defaultValue: "Loading..." })}
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t("profile_page.update_button", { defaultValue: "Update" })}
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
