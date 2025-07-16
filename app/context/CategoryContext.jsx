'use client';
import { createContext, useContext, useState } from 'react';
import {
  AllCategory,
  fetchCreateCategory,
  deleteCategory,
  updateCategory,
  SingleCategory
} from '../services/CategoryServices';
import { showCustomToast } from '../lib/showCustomToast';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [singleCategoryGet, setSingleCategoryGet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });

  // 🔄 Get All Categories with Pagination Handling
  const getAllCategories = async (page = 1) => {
    setLoading(true);
    try {
      const response = await AllCategory(page);

      let categoryData = [];
      let paginationData = {};

      if (Array.isArray(response.data)) {
        categoryData = response.data;
        paginationData = {
          current_page: 1,
          last_page: 1,
          per_page: categoryData.length,
          total: categoryData.length,
        };
      } else if (response.data && Array.isArray(response.data.data)) {
        categoryData = response.data.data;
        paginationData = response.data;
      }

      setCategories(categoryData);
      setPagination({
        current_page: paginationData.current_page || 1,
        last_page: paginationData.last_page || 1,
        total: paginationData.total || categoryData.length,
        per_page: paginationData.per_page || 10,
      });

      setError(null);
    } catch (err) {
      console.log("Caught error:", err);
      setError(err.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const CreateCategory = async (formData) => {
    setLoading(true);
    try {
      const res = await fetchCreateCategory(formData);
      await getAllCategories(pagination.current_page);
      setError(null);
      return res;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.errors) {
        const errorsObj = err.response.data.errors;
        const allErrors = Object.values(errorsObj)
          .flat()
          .join(", ");
        setError(allErrors);
        showCustomToast({
          title: "Validation Error",
          message: allErrors,
          type: "error",
        });
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("");
        showCustomToast({
          title: "Error",
          message: 'Something went wrong',
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const DeleteCategory = async (id) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      await getAllCategories(pagination.current_page);
      setError(null);
      showCustomToast({
        title: "Category delete",
        message: 'Category delete successfully!',
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setError('Failed to delete category');
      showCustomToast({
        title: "Category delete",
        message: 'Failed to delete category!',
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Update Category
  const UpdateCategoryHandler = async (id, formData) => {
    setLoading(true);
    try {
      const res = await updateCategory(id, formData);
      await getAllCategories(pagination.current_page);
      await GetSingleCategory(id)
      setError(null);
      return res;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorsObj = err.response.data.errors;
        const allErrors = Object.values(errorsObj)
          .flat()
          .join(", ");
        setError(allErrors);
        showCustomToast({
          title: "Validation Error",
          message: allErrors,
          type: "error",
        });
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("");
        showCustomToast({
          title: "Error",
          message: 'Something went wrong',
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const GetSingleCategory = async (id) => {
    try {
      const res = await SingleCategory(id);
      console.log(res);
      
      setSingleCategoryGet(res);
      return res;
    } catch (err) {
      console.error(err);
      setError('Failed to fetch category');
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        singleCategoryGet,
        loading,
        error,
        pagination,
        getAllCategories,
        CreateCategory,
        DeleteCategory,
        UpdateCategoryHandler,
        GetSingleCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
