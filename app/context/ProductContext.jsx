"use client";

import { createContext, useContext, useState } from "react";
import {
  AllProduct,
  SingleProduct,
  DeleteProduct,
  CreateProduct,
  updateProduct,
} from "../services/productService.js";
import { useRouter } from "next/navigation.js";
import { showCustomToast } from "../lib/showCustomToast.js";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const Router = useRouter();
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [error, setError] = useState(null);

  const getAllProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await AllProduct(page);

      let productData = [];
      let paginationData = {};

      if (Array.isArray(response.data)) {
        productData = response.data;
        paginationData = {
          current_page: 1,
          last_page: 1,
          per_page: productData.length,
          total: productData.length,
        };
      } else if (response.data && Array.isArray(response.data.data)) {
        productData = response.data.data;
        paginationData = response.data;
      }

      setProducts(productData);
      setPagination({
        current_page: paginationData.current_page || 1,
        last_page: paginationData.last_page || 1,
        total: paginationData.total || productData.length,
        per_page: paginationData.per_page || 10,
      });

      setError(null);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const createProductHandler = async (formData) => {
    setLoading(true);
    try {
      const res = await CreateProduct(formData);
      await getAllProducts(pagination.current_page);
      setError(null);
      return res;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorsObj = err.response.data.errors;
        const allErrors = Object.values(errorsObj).flat().join(", ");
        setError(allErrors);
        showCustomToast({
          title: "Validation Error",
          message: allErrors,
          type: "error",
        });
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
        showCustomToast({
          title: "Error",
          message: "Something went wrong",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProductHandler = async (id) => {
    setLoading(true);
    try {
      await DeleteProduct(id);
      await getAllProducts(pagination.current_page);
      showCustomToast({
        title: "Delete Product",
        message: "Product Delete Successfully.",
        type: "success",
      });
      setError(null);
    } catch (err) {
      showCustomToast({
        title: "Delete Failed",
        message:
          err?.response?.data?.message ||
          "Something went wrong while deleting product.",
        type: "error",
      });
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProductHandler = async (id, formData) => {
    setLoading(true);
    try {
      const res = await updateProduct(id, formData);
      await getAllProducts(pagination.current_page);
      setError(null);
      return res;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorsObj = err.response.data.errors;
        const allErrors = Object.values(errorsObj).flat().join(", ");
        setError(allErrors);
        showCustomToast({
          title: "Validation Error",
          message: allErrors,
          type: "error",
        });
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
        showCustomToast({
          title: "Error",
          message: "Something went wrong",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getSingleProduct = async (id) => {
    try {
      const data = await SingleProduct(id);
      setSingleProduct(data);
      return data;
    } catch (err) {
      setError("Failed to fetch product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        singleProduct,
        loading,
        error,
        pagination,
        getAllProducts,
        createProductHandler,
        deleteProductHandler,
        updateProductHandler,
        getSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
