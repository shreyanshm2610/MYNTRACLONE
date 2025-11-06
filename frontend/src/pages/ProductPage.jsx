// frontend/src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, addToCart, toggleWishlist } from "../api";
import imageMap from "../imageMap";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Product not found.
      </div>
    );

  // ---------- ✅ Image logic (fixed to use name) ----------
  const imageFromMap = imageMap[product.name];
  const imageUrl = imageFromMap
    ? `/images/${imageFromMap}`
    : "/images/default.jpg";
  console.log("🧥 Product:", product.name, "→", imageUrl);
  // --------------------------------------------------------

  // ---------- Button Handlers ----------
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("myntra_token");
      if (!token) return alert("Please login to add items to cart");
      await addToCart(product._id);
      alert("Added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  const handleToggleWishlist = async () => {
    try {
      const token = localStorage.getItem("myntra_token");
      if (!token) return alert("Please login to use wishlist");
      await toggleWishlist(product._id);
      alert("Wishlist updated!");
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (err) {
      alert("Failed to update wishlist");
    }
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100 py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-center gap-12">
      {/* Image Section */}
      <div className="relative group flex-1 flex justify-center">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-700"></div>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full max-w-md rounded-3xl shadow-2xl border-4 border-pink-200 object-contain bg-white p-4 relative z-10"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 text-center md:text-left space-y-6 relative">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
          {product.name}
        </h2>

        <p className="text-4xl font-bold text-gray-800">₹{product.price}</p>

        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description ||
            "Discover your perfect fit with this premium style crafted for comfort and confidence."}
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            🛒 Add to Cart
          </button>

          <button
            onClick={handleToggleWishlist}
            className="border-2 border-fuchsia-500 text-fuchsia-600 px-8 py-3 rounded-full font-semibold hover:bg-fuchsia-50 hover:scale-105 transition-all duration-300"
          >
            ❤️ Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}



