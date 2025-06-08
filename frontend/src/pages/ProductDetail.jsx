// frontend/src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        console.log("ProductDetail response:", response.data);
        if (!response.data) {
          throw new Error("No product data returned");
        }
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error.message);
        toast.error(
          error.response?.data?.message ||
            t("product_detail.fetch_error", {
              defaultValue: "Failed to load product",
            })
        );
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    } else {
      setLoading(false);
      toast.error(
        t("product_detail.invalid_id", { defaultValue: "Invalid product ID" })
      );
    }
  }, [id, t]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error(
        t("product_card.login_error", {
          defaultValue: "Please login to add products to cart",
        }),
        { id: "login" }
      );
      return;
    }
    if (!product) {
      toast.error(
        t("product_detail.error", { defaultValue: "Product not available" })
      );
      return;
    }
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-xl">
          {t("product_detail.loading", { defaultValue: "Loading..." })}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-xl">
          {t("product_detail.not_found", { defaultValue: "Product not found" })}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        className="mb-6 text-emerald-400 hover:text-emerald-300 flex items-center"
        onClick={() => navigate(-1)}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t("product_detail.back", { defaultValue: "Back" })}
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            className="w-full h-[500px] object-cover rounded-lg"
            src={product.image || "/placeholder-image.jpg"}
            alt={product.name || "Product"}
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg" />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {product.name || "N/A"}
            </h1>
            <p className="text-gray-300 text-lg mb-4">
              {product.description || "No description available"}
            </p>
            <p className="text-2xl font-semibold text-emerald-400 mb-4">
              {product.price ? `${product.price} VNĐ` : "N/A"}
            </p>
            <p className="text-gray-400 mb-4">
              {t("product_detail.category", { defaultValue: "Category" })}:{" "}
              {product.category || "N/A"}
            </p>
            {product.isFeatured && (
              <span className="inline-block bg-emerald-600 text-white text-sm px-3 py-1 rounded-full mb-4">
                {t("product_detail.featured", {
                  defaultValue: "Featured Product",
                })}
              </span>
            )}
          </div>
          <button
            className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-center text-lg font-medium
              text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={24} className="mr-2" />
            {t("product_card.add_to_cart", { defaultValue: "Add to cart" })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
