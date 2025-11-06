// frontend/src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { getWishlist } from "../api";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  const loadWishlist = async () => {
    try {
      const res = await getWishlist();
      setItems(res.data || []);
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    }
  };

  useEffect(() => {
    loadWishlist();
    const refresh = () => loadWishlist();
    window.addEventListener("wishlist-updated", refresh);
    return () => window.removeEventListener("wishlist-updated", refresh);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <ProductCard key={p._id} p={p} />
        ))}
      </div>
    </div>
  );
}
