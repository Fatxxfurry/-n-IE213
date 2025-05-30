import { create } from "zustand";
import { toast } from "react-hot-toast";

// Giả lập danh sách sản phẩm
const mockProducts = [
  {
    _id: "1",
    name: "Product 1",
    category: "jeans",
    price: 100,
    description: "Description for Product 1",
    image:
      "https://www.stio.com/cdn/shop/files/200089-471_993b4b8d-72d5-463e-bd65-5c75d5216af9.jpg?v=1702678679",
    isFeatured: true,
  },
  {
    _id: "2",
    name: "Product 2",
    category: "shoes",
    price: 50,
    description: "Description for Product 2",
    image: "https://m.media-amazon.com/images/I/71BzJpSyugL._AC_UY1000_.jpg",
    isFeatured: false,
  },
  {
    _id: "3",
    name: "Product 3",
    category: "t-shirts",
    price: 200,
    description: "Description for Product 3",
    image:
      "https://cdn-images.farfetch-contents.com/18/77/99/17/18779917_40645373_600.jpg",
    isFeatured: true,
  },
];

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const newProduct = {
        ...productData,
        _id: Math.random().toString(36).substr(2, 9),
        isFeatured: productData.isFeatured || false,
      };
      e;
      const storedProducts =
        JSON.parse(localStorage.getItem("products")) || mockProducts;
      storedProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(storedProducts));

      set((prevState) => ({
        products: [...prevState.products, newProduct],
        loading: false,
      }));
      toast.success("Product created successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to create product");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const storedProducts =
        JSON.parse(localStorage.getItem("products")) || mockProducts;
      set({ products: storedProducts, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch products");
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const storedProducts =
        JSON.parse(localStorage.getItem("products")) || mockProducts;
      const filteredProducts = storedProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      set({ products: filteredProducts, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch products");
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      const storedProducts =
        JSON.parse(localStorage.getItem("products")) || mockProducts;
      const updatedProducts = storedProducts.filter(
        (product) => product._id !== productId
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
      toast.success("Product deleted successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to delete product");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const storedProducts =
        JSON.parse(localStorage.getItem("products")) || mockProducts;
      const updatedProducts = storedProducts.map((product) =>
        product._id === productId
          ? { ...product, isFeatured: !product.isFeatured }
          : product
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: !product.isFeatured }
            : product
        ),
        loading: false,
      }));
      toast.success("Product updated successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to update product");
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const storedProducts =
        JSON.parse(localStorage.getItem("products")) || mockProducts;
      const featuredProducts = storedProducts.filter(
        (product) => product.isFeatured
      );
      set({ products: featuredProducts, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch featured products");
    }
  },
}));
