// frontend/src/api.js
import axios from "axios";

// 🔥 Auto-detect environment, with a safe hard-coded fallback for Render
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (process.env.NODE_ENV === "production"
    ? "https://myntraclone-43k4.onrender.com/api"
    : "http://localhost:5000/api");

// ---------- Product APIs ----------
export const getProducts = async () => {
  try {
    return await axios.get(`${API_BASE}/products`);
  } catch (err) {
    console.error("❌ getProducts error:", err);
    throw err;
  }
};

export const getProduct = async (id) => {
  try {
    return await axios.get(`${API_BASE}/products/${id}`);
  } catch (err) {
    console.error("❌ getProduct error:", err);
    throw err;
  }
};

// ---------- Auth APIs ----------
export const register = async (name, email, password) => {
  try {
    const res = await axios.post(`${API_BASE}/auth/register`, {
      name,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("❌ register error:", err);
    throw err;
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE}/auth/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("❌ login error:", err);
    throw err;
  }
};

// ---------- Wishlist APIs ----------
export const getWishlist = async () => {
  try {
    const token = localStorage.getItem("myntra_token");
    return await axios.get(`${API_BASE}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("❌ getWishlist error:", err);
    throw err;
  }
};

export const toggleWishlist = async (productId) => {
  try {
    const token = localStorage.getItem("myntra_token");
    return await axios.post(
      `${API_BASE}/wishlist/toggle/${productId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error("❌ toggleWishlist error:", err);
    throw err;
  }
};

// ---------- Cart APIs ----------
export const getCart = async () => {
  try {
    const token = localStorage.getItem("myntra_token");
    return await axios.get(`${API_BASE}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("❌ getCart error:", err);
    throw err;
  }
};

export const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("myntra_token");
    return await axios.post(
      `${API_BASE}/cart/${productId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error("❌ addToCart error:", err);
    throw err;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const token = localStorage.getItem("myntra_token");
    return await axios.delete(`${API_BASE}/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("❌ removeFromCart error:", err);
    throw err;
  }
};