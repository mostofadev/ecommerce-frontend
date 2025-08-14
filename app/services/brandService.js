import axios from "../lib/axiosInstance";

export const AllBrand = async (page = 1) => {
  const response = await axios.get(`/admin/brand?page=${page}`);
  return response.data;
};

export const SingleBrand = async (id) => {
  const response = await axios.get(`/admin/brand/${id}`);
  return response.data.data;
};

export const deleteBrand = async (id) => {
  const response = await axios.delete(`/admin/brand/${id}`);
  return response.data;
};

export const createBrand = async (formData) => {
  const response = await axios.post(`/admin/brand`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBrand = async (id, formData) => {
  const response = await axios.post(`/admin/brand/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
