const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// ✅ Get wishlist
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist || []);
  } catch (err) {
    console.error("Wishlist GET error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Toggle wishlist item
router.post("/toggle/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findById(req.user._id);

    const index = user.wishlist.findIndex(
      (id) => id.toString() === productId.toString()
    );

    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    const populated = await User.findById(req.user._id).populate("wishlist");
    res.json(populated.wishlist);
  } catch (err) {
    console.error("Wishlist TOGGLE error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
