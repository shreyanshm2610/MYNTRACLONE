const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");

// ✅ Get cart
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    res.json(user.cart || []);
  } catch (err) {
    console.error("Cart GET error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add to cart
router.post("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
    }

    const populated = await User.findById(req.user._id).populate("cart");
    res.json(populated.cart);
  } catch (err) {
    console.error("Cart ADD error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Remove from cart
router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (id) => id.toString() !== productId.toString()
    );
    await user.save();

    const populated = await User.findById(req.user._id).populate("cart");
    res.json(populated.cart);
  } catch (err) {
    console.error("Cart REMOVE error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
