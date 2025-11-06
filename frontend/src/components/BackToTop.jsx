import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react"; // built-in icon library from shadcn/ui

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full shadow-lg z-50 transition-transform transform hover:scale-110"
      title="Back to top"
    >
      <ArrowUp size={22} />
    </motion.button>
  );
}
