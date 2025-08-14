import axios from "../lib/axiosInstance";

export const fetchFormCategories = async () => {
  const response = await axios.get(`/admin/categories/form`);
  return response.data;
};

export const fetchFormSubCategories = async () => {
  const response = await axios.get(`/admin/subcategories/form`);
  return response.data;
};

export const fetchFormBrands = async () => {
  const response = await axios.get(`/admin/brands/form`);
  return response.data;
};

export const AllSubCategory = async (page = 1) => {
  const response = await axios.get(`/admin/subcategory?page=${page}`);
  return response.data;
};

export const SingleSubCategory = async (id) => {
  const response = await axios.get(`/admin/subcategory/${id}`);
  return response.data.data;
};

export const deleteSubCategory = async (id) => {
  const response = await axios.delete(`/admin/subcategory/${id}`);
  return response.data;
};

export const createSubCategory = async (formData) => {
  const response = await axios.post(`/admin/subcategory`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateSubCategory = async (id, formData) => {
  const response = await axios.post(`/admin/subcategory/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
