import axios from "../lib/axiosInstance";

export const AllProduct = async (page = 1) => {
  const response = await axios.get(`/admin/product?page=${page}`);
  return response.data;
};

export const SingleProduct = async (id) => {
  const response = await axios.get(`/admin/product/${id}`);
  return response.data.data;
};

export const DeleteProduct = async (id) => {
  const response = await axios.delete(`/admin/product/${id}`);
  return response.data;
};

export const CreateProduct = async (formData) => {
  const response = await axios.post(`/admin/product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await axios.post(`/admin/product/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
