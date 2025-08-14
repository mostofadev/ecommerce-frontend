import { notFound, useRouter } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";
import {
  fetchFilteredProducts,
  fetchProductBest,
  fetchProductNew,
  homePageAllProduct,
  searchProducts,
  SingleProduct,
  fetchCategory,
  fetchCategoryProduct,
} from "../services/homePageServices";
import { useCallback } from "react";
import { showCustomToast } from "../lib/showCustomToast";

const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const Router = useRouter();
  const [HomeProducts, setHomeProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [HomeSingleProduct, setHomeSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });

  const [catPagination, setCatPagination] = useState({
    cat_current_page: 1,
    cat_last_page: 1,
    cat_total: 0,
    cat_per_page: 10,
  });

  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState([]);
  const [bestProduct, setBestProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [CategoryProduct, setCategoryProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedSubcategories: [],
    selectedBrands: [],
    priceRange: { min: "", max: "" },
    discountRange: { min: "", max: "" },
    activeSort: "Best Seller",
  });

  const [filterProducts, setFilterProducts] = useState([]);

  const getAllHomeProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await homePageAllProduct(page);

      let productData = [];
      let paginationData = {};

      if (Array.isArray(response.data)) {
        productData = response.data;
        paginationData = {
          current_page: 1,
          last_page: 1,
          total: productData.length,
          per_page: productData.length,
        };
      } else if (response.data && Array.isArray(response.data.data)) {
        productData = response.data.data;
        paginationData = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          total: response.data.total,
          per_page: response.data.per_page,
        };
      }

      setHomeProducts(productData);
      setPagination(paginationData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getSingleProduct = async (slug) => {
    setLoading(true);
    setError(null);
    setSingleProduct(null);

    try {
      const response = await SingleProduct(slug); // axios call
      setSingleProduct(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Product not found");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const searchForProducts = useCallback(async (query) => {
    if (!query || query.length < 1) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    try {
      const data = await searchProducts(query);
      setSearchResults(data.data);
    } catch (err) {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const fetchFilterProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchFilteredProducts(filters);
      setFilterProducts(data || []);
    } catch (err) {
      setFilterProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterProducts();
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({
      activeSort: "Best Seller",
      priceRange: { min: "", max: "" },
      discountRange: { min: "", max: "" },
      selectedCategories: [],
      selectedSubcategories: [],
      selectedBrands: [],
    });
  };

  const ProductNewHandle = async () => {
    setLoading(true);
    try {
      const response = await fetchProductNew();
      setNewProduct(response.data);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const ProductBestHandle = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchProductBest(page);
      setBestProduct(response.data);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryHandle = async () => {
    setLoading(true);
    try {
      const data = await fetchCategory();
      setCategory(data.data);
    } catch (err) {
      setCategory([]);
      setError("Failed to Fetch");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProductHandle = async (slug, page = 1) => {
    setLoading(true);
    try {
      const response = await fetchCategoryProduct(slug, page);
      let productData = [];
      let paginationData = {
        cat_current_page: 1,
        cat_last_page: 1,
        cat_total: 0,
        cat_per_page: 10,
      };
      if (Array.isArray(response)) {
        productData = response;
        paginationData = {
          cat_current_page: 1,
          cat_last_page: 1,
          cat_total: productData.length,
          cat_per_page: productData.length,
        };
      } else if (response.data && Array.isArray(response.data.data)) {
        productData = response.data.data;
        paginationData = {
          cat_current_page: response.data.current_page,
          cat_last_page: response.data.last_page,
          cat_total: response.data.total,
          cat_per_page: response.data.per_page,
        };
      }
      setCategoryProduct(productData);
      setCatPagination(paginationData);
    } catch (err) {
      setCategoryProduct([]);
      setCatPagination({
        cat_current_page: 1,
        cat_last_page: 1,
        cat_total: 0,
        cat_per_page: 10,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <HomePageContext.Provider
      value={{
        HomeProducts,
        singleProduct,
        loading,
        error,
        pagination,
        getAllHomeProducts,
        getSingleProduct,

        // Search
        searchQuery,
        setSearchQuery,
        searchResults,
        searchLoading,
        searchForProducts,

        //filter

        filters,
        setFilters,
        filterProducts,
        updateFilters,
        clearAllFilters,
        fetchFilterProducts,

        // new best
        ProductNewHandle,
        ProductBestHandle,
        newProduct,
        bestProduct,

        // category
        category,
        fetchCategoryHandle,
        CategoryProduct,
        catPagination,
        fetchCategoryProductHandle,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
export const useHomeProductContext = () => useContext(HomePageContext);
