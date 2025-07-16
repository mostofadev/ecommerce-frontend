import axios from "../lib/axiosInstance";

// 🔄 Get All Banners (with pagination support)
export const getAllBanners = async (page = 1) => {
  const response = await axios.get(`/admin/banners?page=${page}`);
  return response.data;
};

// 🔍 Get Single Banner
export const getSingleBanner = async (id) => {
  const response = await axios.get(`/admin/banners/${id}`);
  return response.data;
};

// ➕ Create Banner
export const createBanner = async (formData) => {
  const response = await axios.post(`/admin/banners`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ✏️ Update Banner
export const updateBanner = async (id, formData) => {
  const response = await axios.post(`/admin/banners/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ❌ Delete Banner
export const deleteBanner = async (id) => {
  const response = await axios.delete(`/admin/banners/${id}`);
  return response.data;
};
