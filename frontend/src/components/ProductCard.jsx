import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      className="flex w-full relative flex-col overflow-hidden rounded-xl border border-gray-700 shadow-xl bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
    >
      {/* Image Section */}
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <motion.img
          className="object-cover w-full"
          src={product.image}
          alt={product.name}
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="mt-4 px-5 pb-5 flex flex-col gap-3">
        <h5 className="text-xl font-semibold tracking-tight text-white drop-shadow-md line-clamp-2">
          {product.name}
        </h5>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-400 drop-shadow-md">
            ${product.price?.toFixed(2) || "N/A"}
          </span>
        </div>
        <motion.button
          className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-colors duration-200"
          onClick={handleAddToCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
