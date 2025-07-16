import axios from '../lib/axiosInstance';

export const fetchFormCategories = async () => {
  const response = await axios.get(`/admin/categories/form`);
 // console.log(response.data);
  return response.data;
};

export const fetchFormSubCategories = async () => {
  const response = await axios.get(`/admin/subcategories/form`);
 // console.log(response.data);
  return response.data;
};

export const fetchFormBrands = async () => {
  const response = await axios.get(`/admin/brands/form`);
 // console.log(response.data);
  return response.data;
};
// ✅ Get All Sub Categories with Pagination
export const AllSubCategory = async (page = 1) => {
  const response = await axios.get(`/admin/subcategory?page=${page}`);
 // console.log(response.data);
  return response.data;
};

// ✅ Get a Single Sub Category
export const SingleSubCategory = async (id) => {
  const response = await axios.get(`/admin/subcategory/${id}`);
  return response.data.data;
};

// ✅ Delete Sub Category
export const deleteSubCategory = async (id) => {
  const response = await axios.delete(`/admin/subcategory/${id}`);
  return response.data;
};

// ✅ Create Sub Category (with image)
export const createSubCategory = async (formData) => {
  const response = await axios.post(`/admin/subcategory`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ✅ Update Sub Category (with image)
export const updateSubCategory = async (id, formData) => {
  const response = await axios.post(`/admin/subcategory/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
