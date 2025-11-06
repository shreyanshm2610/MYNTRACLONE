import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toggleWishlist, getWishlist } from "../api";
import imageMap from "../imageMap";

export default function ProductCard({ p }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const res = await getWishlist();
        const ids = res.data.map((item) => item._id);
        setIsWishlisted(ids.includes(p._id));
      } catch {
        setIsWishlisted(false);
      }
    };
    loadWishlist();
  }, [p._id]);

  // ---------- ✅ Image logic (fixed) ----------
  const imageFromMap = imageMap[p.name]; // map by name, not _id
  const imageUrl = imageFromMap
    ? `/images/${imageFromMap}`
    : "/images/default.jpg";
  // -------------------------------------------

  // ---------- Wishlist handler ----------
  const handleWishlist = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("myntra_token");
      if (!token) return alert("Please login to use wishlist");
      await toggleWishlist(p._id);
      setIsWishlisted(!isWishlisted);
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch {
      alert("Failed to update wishlist");
    }
  };

  // ---------- Render ----------
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-pink-100 relative">
      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100 transition-all duration-300"></div>

      <Link to={`/product/${p._id}`} className="block relative z-10">
        <img
          src={imageUrl}
          alt={p.name}
          className="w-full h-72 object-contain bg-white rounded-t-3xl p-2"
        />
      </Link>

      <div className="p-4 flex justify-between items-center relative z-10">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
          <p className="text-pink-600 font-bold text-xl mt-1">₹{p.price}</p>
        </div>
        <button
          onClick={handleWishlist}
          className="text-2xl transition-transform hover:scale-125"
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

