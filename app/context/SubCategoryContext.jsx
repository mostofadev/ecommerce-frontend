'use client';
import { createContext, useContext, useState } from 'react';
import {
  fetchFormCategories,
  fetchFormSubCategories,
  fetchFormBrands,

  AllSubCategory,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  SingleSubCategory,
} from '../services/subCategoryServices';
import { showCustomToast } from '../lib/showCustomToast';
const SubCategoryContext = createContext();

export const SubCategoryProvider = ({ children }) => {
  const [formCategories, setFormCategories] = useState([]);
  const [formSubCategories, setFormSubCategories] = useState([]);
  const [formBrands, setFormBrands] = useState([]);

  const [subCategories, setSubCategories] = useState([]);
  const [singleSubCategory, setSingleSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [error, setError] = useState(null);
   const getAllCategories = async () => {
    try {
      const res = await fetchFormCategories();
      setFormCategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const getAllSubCategory = async () => {
    try {
      const res = await fetchFormSubCategories();
      setFormSubCategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
    }
  };

  const getAllBrand = async () => {
    try {
      const res = await fetchFormBrands();
     // console.log(res);
      
      setFormBrands(res.data || []);
    } catch (err) {
      console.error("Failed to fetch brands", err);
    }
  };
  const getAllSubCategories = async (page = 1) => {
    setLoading(true);
    try {
      const response = await AllSubCategory(page);

      let subCategoryData = [];
      let paginationData = {};

      if (Array.isArray(response.data)) {
        subCategoryData = response.data;
        paginationData = {
          current_page: 1,
          last_page: 1,
          per_page: subCategoryData.length,
          total: subCategoryData.length,
        };
      } else if (response.data && Array.isArray(response.data.data)) {
        subCategoryData = response.data.data;
        paginationData = response.data;
      }

      setSubCategories(subCategoryData);
      setPagination({
        current_page: paginationData.current_page || 1,
        last_page: paginationData.last_page || 1,
        total: paginationData.total || subCategoryData.length,
        per_page: paginationData.per_page || 10,
      });

      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load sub-categories');
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create Sub Category
  const createSubCategoryHandler = async (formData) => {
    setLoading(true);
    try {
      const res = await createSubCategory(formData);
      await getAllSubCategories(pagination.current_page);
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
      setError("Something went wrong");
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

  const deleteSubCategoryHandler = async (id) => {
    setLoading(true);
    try {
      await deleteSubCategory(id);
      await getAllSubCategories(pagination.current_page);
      setError(null);
      showCustomToast({
        title: "Sub-Category delete",
        message: 'Sub-Category delete successfully!',
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setError('Failed to delete sub-category');
      showCustomToast({
        title: "Sub-Category delete",
        message: 'Failed to delete Sub-category!',
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Update Sub Category
  const updateSubCategoryHandler = async (id, formData) => {
    setLoading(true);
    try {
      const res = await updateSubCategory(id, formData);
      await getAllSubCategories(pagination.current_page);
      setError(null);
      return res;
    } catch (err) {
      console.error(err);
      
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

  // 🔍 Get Single Sub Category
  const getSingleSubCategory = async (id) => {
    try {
      const data = await SingleSubCategory(id);
      setSingleSubCategory(data);
      return data;
    } catch (err) {
      console.error(err);
      setError('Failed to fetch sub-category');
    }
  };

  return (
    <SubCategoryContext.Provider
      value={{
       subCategories,
        singleSubCategory,
        loading,
        error,
        pagination,

        // Form Data
        formCategories,
        formSubCategories,
        formBrands,
        getAllCategories,
        getAllSubCategory,
        getAllBrand,

        // CRUD
        getAllSubCategories,
        createSubCategoryHandler,
        deleteSubCategoryHandler,
        updateSubCategoryHandler,
        getSingleSubCategory,
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};

export const useSubCategoryContext = () => useContext(SubCategoryContext);
