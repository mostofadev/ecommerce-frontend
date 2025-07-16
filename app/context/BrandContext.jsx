'use client';
import { createContext, useContext, useState } from 'react';
import {
  AllBrand,
  createBrand,
  deleteBrand,
  updateBrand,
  SingleBrand,
} from '../services/brandService';
import { showCustomToast } from '../lib/showCustomToast';

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brand, setBrand] = useState([]);
   const [singleBrandGet,setSingleBrandGet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [error, setError] = useState(null);

  // 🔄 Get All Brands with Pagination Handling
  const getAllBrands = async (page = 1) => {
    setLoading(true);
    try {
      const response = await AllBrand(page);

      let brandData = [];
      let paginationData = {};

      if (Array.isArray(response.data)) {
        // Non-paginated fallback
        brandData = response.data;
        paginationData = {
          current_page: 1,
          last_page: 1,
          per_page: brandData.length,
          total: brandData.length,
        };
      } else if (response.data && Array.isArray(response.data.data)) {
        // Paginated response
        brandData = response.data.data;
        paginationData = response.data;
      }

      setBrand(brandData);
      setPagination({
        current_page: paginationData.current_page || 1,
        last_page: paginationData.last_page || 1,
        total: paginationData.total || brandData.length,
        per_page: paginationData.per_page || 10,
      });

      setError(null);
    } catch (err) {
      setError('Failed to load brands');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create Brand
  const CreateBrands = async (formData) => {
    setLoading(true);
    try {
      const res = await createBrand(formData);
      await getAllBrands(pagination.current_page); // preserve current page
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

  const DeleteBrands = async (id) => {
    setLoading(true);
    try {
      await deleteBrand(id);
      await getAllBrands(pagination.current_page);
      setError(null);
      showCustomToast({
        title: "Brand delete",
        message: 'Brand delete successfully!',
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setError('Failed to delete brand');
      showCustomToast({
        title: "brand delete",
        message: 'Failed to delete brand!',
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
const GetSingleBrand = async (id) => {
    try {
      const data = await SingleBrand(id);
      setSingleBrandGet(data)
      return data;
    } catch (err) {
      console.error(err);
      setError('Failed to fetch brand');
    }
  };
  const UpdateBrands = async (id, formData) => {
    setLoading(true);
    try {
      const res = await updateBrand(id, formData);
      await getAllBrands(pagination.current_page);
      await GetSingleBrand(id)
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

  
  

  return (
    <BrandContext.Provider
      value={{
        brand,
        singleBrandGet,
        loading,
        error,
        pagination,
        getAllBrands,
        CreateBrands,
        DeleteBrands,
        UpdateBrands,
        GetSingleBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrandContext = () => useContext(BrandContext);
