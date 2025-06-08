// frontend/src/components/ProductCard.jsx
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Debug product._id
  console.log("ProductCard props:", product);

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
    addToCart(product);
  };

  const handleViewDetails = () => {
    if (!product?._id) {
      console.error("Invalid product ID:", product);
      toast.error(t("product_card.error", { defaultValue: "Invalid product" }));
      return;
    }
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      <div
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer"
        onClick={handleViewDetails}
      >
        <img
          className="object-cover w-full"
          src={product.image}
          alt={t("product_card.image_alt", { defaultValue: "product image" })}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5
          className="text-xl font-semibold tracking-tight text-white cursor-pointer hover:text-emerald-400"
          onClick={handleViewDetails}
        >
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              {product.price} VNĐ
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
            text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          {t("product_card.add_to_cart", { defaultValue: "Add to cart" })}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
