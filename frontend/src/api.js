import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// ---------- AUTH ----------
export const login = (email, password) =>
  axios.post(`${API_BASE}/auth/login`, { email, password });

export const register = (name, email, password) =>
  axios.post(`${API_BASE}/auth/register`, { name, email, password });

// ---------- PRODUCTS ----------
export const getProducts = () => axios.get(`${API_BASE}/products`);
export const getProduct = (id) => axios.get(`${API_BASE}/products/${id}`);

// ---------- CART ----------
export const getCart = async () => {
  const token = localStorage.getItem("myntra_token");
  return axios.get(`${API_BASE}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addToCart = async (id) => {
  const token = localStorage.getItem("myntra_token");
  return axios.post(
    `${API_BASE}/cart/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const removeFromCart = async (id) => {
  const token = localStorage.getItem("myntra_token");
  return axios.delete(`${API_BASE}/cart/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCartQuantity = async (id, quantity) => {
  const token = localStorage.getItem("myntra_token");
  return axios.put(
    `${API_BASE}/cart/${id}`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};


// ---------- WISHLIST ----------
export const getWishlist = async () => {
  const token = localStorage.getItem("myntra_token");
  return axios.get(`${API_BASE}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toggleWishlist = async (id) => {
  const token = localStorage.getItem("myntra_token");
  return axios.post(
    `${API_BASE}/wishlist/toggle/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
