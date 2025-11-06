// frontend/src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartQuantity } from "../api";
import { motion } from "framer-motion";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧭 Load cart items
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await getCart();
        setCartItems(res.data || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // 🧮 Total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // 🧹 Remove item
  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      setCartItems(cartItems.filter((i) => i._id !== id));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  // 🔢 Quantity change
  const handleQuantityChange = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartQuantity(id, newQty);
      setCartItems((prev) =>
        prev.map((i) => (i._id === id ? { ...i, quantity: newQty } : i))
      );
    } catch (err) {
      alert("Failed to update quantity");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        Loading your cart...
      </div>
    );

  if (!cartItems.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">
            Your cart is empty 🛒
          </h2>
          <p className="text-gray-600">
            Add items to your cart to view them here.
          </p>
        </div>
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
          Your Cart
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Review and manage the items you’ve added.
        </p>
      </motion.div>

      {/* Cart Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-3xl shadow-md p-5 border border-pink-100 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {item.name}
                </h3>
                <p className="text-pink-600 font-bold text-xl mt-1">
                  ₹{item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-pink-100 text-pink-600 font-bold rounded-full hover:bg-pink-200"
                  >
                    −
                  </button>
                  <span className="font-semibold text-gray-800">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-pink-100 text-pink-600 font-bold rounded-full hover:bg-pink-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:text-red-700 font-semibold mt-4 sm:mt-0"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>

        {/* Right Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 border border-pink-100 sticky top-24 h-fit"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-pink-200">
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-700 mb-3">
            <span>Items ({cartItems.length})</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-3">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="border-t border-pink-200 mt-4 pt-4 flex justify-between text-xl font-bold text-gray-800">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="w-full mt-6 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            Proceed to Checkout
          </button>
        </motion.div>
      </div>
    </div>
  );
}


