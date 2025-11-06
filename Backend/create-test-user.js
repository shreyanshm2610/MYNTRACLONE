// backend/create-test-user.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { MONGO_URI } = require("./config");
const User = require("./models/User");

async function createTestUser() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const email = "tester@example.com";
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists:", email);
      await mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash("Test1234", 10);
    const user = new User({
      name: "Tester",
      email,
      password: hashedPassword,
      cart: [],
      wishlist: [],
    });

    await user.save();
    console.log("✅ Created test user:");
    console.log("Email:", email);
    console.log("Password: Test1234");

    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error creating test user:", err);
  }
}

createTestUser();
