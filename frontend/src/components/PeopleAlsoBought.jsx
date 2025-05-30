import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "../stores/useProductStore";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
  const { products, fetchFeaturedProducts, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-400">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-300">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
