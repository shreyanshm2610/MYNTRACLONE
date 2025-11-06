// backend/seed-products.js
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const Product = require("./models/Product");

const products = [
  { name: "Men's Casual T-Shirt", category: "Men", price: 799, description: "Soft cotton slim-fit T-shirt for everyday comfort and style." },
  { name: "Men's Blue Denim Jeans", category: "Men", price: 1599, description: "Classic slim-fit jeans made with stretchable cotton fabric." },
  { name: "Men's Leather Jacket", category: "Men", price: 2999, description: "Genuine leather biker jacket for bold style and comfort." },
  { name: "Women's Floral Dress", category: "Women", price: 1299, description: "Beautiful summer dress with elegant floral patterns." },
  { name: "Women's Heels", category: "Women", price: 899, description: "Comfortable high heels perfect for parties and office wear." },
  { name: "Women's Designer Saree", category: "Women", price: 2499, description: "Traditional silk saree with modern design patterns." },
  { name: "Running Shoes", category: "Footwear", price: 1999, description: "Breathable, lightweight running shoes for everyday fitness." },
  { name: "Casual Sneakers", category: "Footwear", price: 1499, description: "Trendy sneakers for men and women with soft cushioning." },
  { name: "Formal Leather Shoes", category: "Footwear", price: 2499, description: "Classic formal shoes for business or formal occasions." },
  { name: "Sunglasses", category: "Accessories", price: 999, description: "Stylish UV-protected sunglasses for men and women." },
  { name: "Smart Watch", category: "Accessories", price: 2999, description: "Touchscreen smartwatch with health tracking features." },
  { name: "Leather Handbag", category: "Accessories", price: 1999, description: "Elegant leather handbag with spacious compartments." },
  { name: "Women’s Sandals", category: "Footwear", price: 1099, description: "Comfortable flat sandals with a modern strap design." },
  { name: "Men's Sports Shorts", category: "Men", price: 699, description: "Moisture-wicking shorts ideal for gym and outdoor activities." },
  { name: "Women’s Casual Top", category: "Women", price: 799, description: "Lightweight cotton top perfect for daily wear." },
  { name: "Analog Wrist Watch", category: "Accessories", price: 1499, description: "Stylish analog watch with leather strap." },
  { name: "Women’s Jeans", category: "Women", price: 1699, description: "Stretchable denim jeans with a comfortable fit." },
  { name: "Men's Sneakers", category: "Footwear", price: 1899, description: "Stylish sneakers with durable sole and breathable fabric." },
  { name: "Men's Hoodie", category: "Men", price: 1199, description: "Soft cotton hoodie for casual comfort." },
  { name: "Backpack", category: "Accessories", price: 1499, description: "Durable backpack with multiple storage compartments." }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected for seeding...");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded products.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
