import { useEffect, useState, useRef } from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";

const AllProductPage = () => {
  const { fetchAllProducts, products } = useProductStore();
  const [sortType, setSortType] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // [min, max]
  const [activeSlider, setActiveSlider] = useState(null);
  const sliderRef = useRef(null);
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

  const minPrice =
    products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0;
  const maxPrice =
    products.length > 0 ? Math.max(...products.map((p) => p.price)) : 1000;

  const handleMinChange = (value) => {
    if (value <= priceRange[1] - 10) {
      setPriceRange([Math.round(value), priceRange[1]]);
    }
  };

  const handleMaxChange = (value) => {
    if (value >= priceRange[0] + 10) {
      setPriceRange([priceRange[0], Math.round(value)]);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const sliderWidth = rect.width || 128;
    const clickPercentage = Math.max(0, Math.min(1, clickX / sliderWidth));
    const clickValue = minPrice + (maxPrice - minPrice) * clickPercentage;

    const distanceToMin = Math.abs(clickValue - priceRange[0]);
    const distanceToMax = Math.abs(clickValue - priceRange[1]);

    if (distanceToMin <= distanceToMax) {
      setActiveSlider("min");
      handleMinChange(clickValue);
    } else {
      setActiveSlider("max");
      handleMaxChange(clickValue);
    }
  };

  const handleMouseMove = (e) => {
    if (!activeSlider || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const sliderWidth = rect.width || 128;
    const clickPercentage = Math.max(0, Math.min(1, clickX / sliderWidth));
    const clickValue = minPrice + (maxPrice - minPrice) * clickPercentage;

    if (activeSlider === "min") {
      handleMinChange(clickValue);
    } else if (activeSlider === "max") {
      handleMaxChange(clickValue);
    }
  };

  const handleMouseUp = () => {
    setActiveSlider(null);
  };

  useEffect(() => {
    if (activeSlider) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeSlider, minPrice, maxPrice, priceRange]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const sortedProducts = [...products]
    .filter((product) => {
      if (!product || !product.price || !product.name) return false;
      if (searchTerm === "") {
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      }
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
      );
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

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
          <div className="flex items-center">
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
          <div className="flex items-center gap-2">
            <label className="text-lg text-gray-300">
              {t("category.price_range", {
                min: priceRange[0],
                max: priceRange[1],
                defaultValue: `Price Range: $${priceRange[0]} - $${priceRange[1]}`,
              })}
            </label>
            <div className="relative w-32 h-6" ref={sliderRef}>
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-600 rounded-full">
                <div
                  className="absolute h-1 bg-emerald-400 rounded-full"
                  style={{
                    left: `${
                      ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100
                    }%`,
                    width: `${
                      ((priceRange[1] - priceRange[0]) /
                        (maxPrice - minPrice)) *
                      100
                    }%`,
                  }}
                />
              </div>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => handleMinChange(parseInt(e.target.value))}
                onMouseDown={handleMouseDown}
                className="absolute top-0 left-0 w-full h-6 bg-transparent appearance-none cursor-pointer outline-none min-slider"
                style={{
                  pointerEvents:
                    activeSlider && activeSlider !== "min" ? "none" : "auto",
                }}
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                onMouseDown={handleMouseDown}
                className="absolute top-0 left-0 w-full h-6 bg-transparent appearance-none cursor-pointer outline-none max-slider"
                style={{
                  pointerEvents:
                    activeSlider && activeSlider !== "max" ? "none" : "auto",
                }}
              />
            </div>
          </div>
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
