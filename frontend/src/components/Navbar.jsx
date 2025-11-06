// frontend/src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getWishlist, getCart } from "../api";

export default function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // ✅ Load cart & wishlist counts on page load and update when triggered
  useEffect(() => {
    const loadCounts = async () => {
      try {
        const w = await getWishlist();
        setWishlistCount(w.data?.length || 0);

        const c = await getCart();
        setCartCount(c.data?.length || 0);
      } catch {
        setWishlistCount(0);
        setCartCount(0);
      }
    };

    loadCounts();

    const refresh = () => loadCounts();
    window.addEventListener("wishlist-updated", refresh);
    window.addEventListener("cart-updated", refresh);

    return () => {
      window.removeEventListener("wishlist-updated", refresh);
      window.removeEventListener("cart-updated", refresh);
    };
  }, []);

  // ✅ Handle Logout and redirect to Landing page
  const handleLogout = () => {
    localStorage.removeItem("myntra_token");
    localStorage.removeItem("myntra_user");

    setWishlistCount(0);
    setCartCount(0);

    // Redirect to landing page
    navigate("/landing");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* ✅ Logo redirects to Landing Page */}
      <Link
  to="/landing"
  className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition"
>
  Trendora
</Link>


      {/* ✅ Navigation Icons & Auth Buttons */}
      <div className="flex items-center gap-6">
        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative text-xl hover:scale-110 transition-transform"
        >
          ❤️
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative text-xl hover:scale-110 transition-transform"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Login / Logout */}
        {localStorage.getItem("myntra_token") ? (
          <button
            onClick={handleLogout}
            className="border border-pink-600 text-pink-600 px-4 py-1.5 rounded-lg font-medium hover:bg-pink-50 hover:scale-105 transition-transform"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-pink-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-pink-700 hover:scale-105 transition-transform"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
