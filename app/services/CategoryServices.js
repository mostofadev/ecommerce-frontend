import axios from "../lib/axiosInstance";

export const AllCategory = async (page = 1) => {
  const res = await axios.get(`/admin/category?page=${page}`);
  return res.data.data;
};

export const fetchCreateCategory = async (data) => {
  const res = await axios.post("/admin/category", data);
  return res;
};

export const updateCategory = async (id, data) => {
  const res = await axios.post(`/admin/category/${id}`, data);
  return res;
};

export const deleteCategory = async (id) => {
  const res = await axios.delete(`/admin/category/${id}`);
  return res;
};

export const SingleCategory = async (id) => {
  const res = await axios.get(`/admin/category/${id}`);
  return res.data;
};
