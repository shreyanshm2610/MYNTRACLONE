import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (selectedCategory !== "All") {
      const normalized = selectedCategory.toLowerCase().replace(/'s$/, "");
      updated = updated.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase().includes(normalized)
      );
    }

    if (searchTerm.trim() !== "") {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "low-high") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFiltered(updated);
  }, [selectedCategory, sortOrder, searchTerm, products]);

  if (loading)
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        Loading products...
      </div>
    );

  if (!filtered.length)
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        No products found for the selected filter.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 py-16 px-6 md:px-12 lg:px-20">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          Trendora Collection
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Discover our latest arrivals and handpicked fashion essentials.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full mx-auto mt-4"></div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-4 mb-10 border border-pink-100">
        <div className="flex items-center gap-3">
          <label className="text-pink-700 font-semibold">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-full border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option>All</option>
            <option>Men</option>
            <option>Women</option>
            <option>Footwear</option>
            <option>Accessories</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-pink-700 font-semibold">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="px-4 py-2 rounded-full border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-pink-700 font-semibold">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 rounded-full border border-pink-300 focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="none">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <motion.div
        className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {filtered.map((p) => (
          <ProductCard key={p._id} p={p} />
        ))}
      </motion.div>
    </div>
  );
}


