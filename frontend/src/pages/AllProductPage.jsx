import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";

const AllProductPage = () => {
  const { fetchAllProducts, products } = useProductStore();
  const [sortType, setSortType] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedProducts = [...products]
    .filter((product) => {
      if (searchTerm === "") {
        return true;
      }
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortType === "price") {
        return a.price - b.price;
      } else if (sortType === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("all_products.title", { defaultValue: "All Products" })}
        </motion.h1>

        <div className="mb-6 text-center">
          <label htmlFor="sort" className="mr-2 text-lg text-gray-300">
            {t("all_products.sort_by", { defaultValue: "Sort by:" })}
          </label>
          <select
            id="sort"
            value={sortType}
            onChange={handleSortChange}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="none">
              {t("all_products.sort.none", { defaultValue: "None" })}
            </option>
            <option value="price">
              {t("all_products.sort.price", { defaultValue: "Price" })}
            </option>
            <option value="name">
              {t("all_products.sort.name", { defaultValue: "Name" })}
            </option>
          </select>
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-gray-700 text-white p-2 rounded ml-4"
            placeholder={t("all_products.search_placeholder", {
              defaultValue: "Search by name",
            })}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {sortedProducts.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              {t("all_products.no_products", {
                defaultValue: "No products found",
              })}
            </h2>
          )}

          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AllProductPage;
