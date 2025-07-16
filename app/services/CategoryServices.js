import axios from "../lib/axiosInstance";

// ✅ Get All Categories
export const AllCategory = async (page = 1) => {
  const res = await axios.get(`/admin/category?page=${page}`);
  console.log(res);
  
  return res.data.data;
};

// ✅ Create Category
export const fetchCreateCategory = async (data) => {
 
     const res = await axios.post("/admin/category", data);
  return res;
  
 
};

// ✅ Update Category
export const updateCategory = async (id, data) => {
    console.log("services",data);
  const res = await axios.post(`/admin/category/${id}`, data);
  return res;
};

// ✅ Delete Category
export const deleteCategory = async (id) => {
  const res = await axios.delete(`/admin/category/${id}`);
  return res;
};

// ✅ Get Single Category
export const SingleCategory = async (id) => {
  const res = await axios.get(`/admin/category/${id}`);
  console.log(res.data);
  
  return res.data;
};
