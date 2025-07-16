import axios from '../lib/axiosInstance';

export const homePageAllProduct = async (page = 1) => {
  const response = await axios.get(`/home/products?page=${page}`);
  return response.data;
};
export const SingleProduct = async (slug) => {
  const response = await axios.get(`/single/product/${slug}`);
  return response.data;
};


export const searchProducts = async (query) => {
  console.log(query);
  
  if (!query) return [];
  const response = await axios.get(`/products/search?q=${encodeURIComponent(query)}`);
  
  return response.data;
};



// export const fetchFilteredProducts = async (filters = {}) => {
//   try {
//     const params = {};

//     if (filters.selectedCategories?.length) {
//       params.categories = filters.selectedCategories.join(',');
//     }
//     if (filters.selectedSubcategories?.length) {
//       params.subcategories = filters.selectedSubcategories.join(',');
//     }
//     if (filters.selectedBrands?.length) {
//       params.brands = filters.selectedBrands.join(',');
//     }
//     if (filters.priceRange?.min) {
//       params.min_price = filters.priceRange.min;
//     }
//     if (filters.priceRange?.max) {
//       params.max_price = filters.priceRange.max;
//     }
//     if (filters.discountRange?.min) {
//       params.min_discount = filters.discountRange.min;
//     }
//     if (filters.discountRange?.max) {
//       params.max_discount = filters.discountRange.max;
//     }
//     if (filters.activeSort) {
//       params.sort_by = filters.activeSort;
//     }

//     const res = await axios.get('/filter/product', {
//       params,
//     });

//     return res.data.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     return [];
//   }
// };



export const fetchFilteredProducts = async (filters = {}) => {
  try {
    const res = await axios.get('/filter/product', { params: filters });
    if (Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};



export const fetchProductNew = async () => {
  const response = await axios.get(`/product/new`);
  return response.data;
};

export const fetchProductBest = async (page=1) => {
  const response = await axios.get(`/product/best`);
  return response.data;
};


export const fetchCategory = async ()=> {
const response = await axios.get(`/home/category`);
console.log('category api ',response);

return response.data
}

export const fetchCategoryProduct = async (slug, page = 1) => {
  console.log(slug,page);
  
  const response = await axios.get(`/category/product/${slug}?page=${page}`);
  console.log(response);
  
  return response;
};