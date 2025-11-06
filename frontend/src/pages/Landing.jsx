// frontend/src/pages/Landing.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-40 top-10 -left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-fuchsia-300 rounded-full blur-3xl opacity-40 bottom-10 right-0 animate-pulse"></div>

      {/* ✅ HERO SECTION */}
      <div className="relative flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 md:px-16 py-20 z-10">
        <motion.div
          className="max-w-xl z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
            Step Into <span className="text-pink-600">Trendora</span>
          </h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Explore colors, comfort, and confidence with{" "}
            <span className="font-semibold text-pink-600">fashion that fits your vibe.</span>
          </motion.p>

          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition"
          >
            Shop Now
          </motion.a>
        </motion.div>

        <motion.img
          src="/images/hero-banner.jpg"
          alt="Fashion Banner"
          className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10 rounded-2xl shadow-2xl object-cover border-4 border-pink-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </div>

      {/* ✅ BACK TO TOP BUTTON */}
      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.15 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white p-3 rounded-full shadow-lg z-50 transition"
        >
          ⬆
        </motion.button>
      )}
    </div>
  );
}

