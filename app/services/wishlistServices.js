import userAxios from "../lib/axiosUser";
export const fetchWishlistIndex = async (page = 1) => {
  const response = await userAxios.get(`/wishlist?page=${page}`);
  return response.data;
};
export const fetchWishlistAdd = async (data) => {
  const response = await userAxios.post("/wishlist", {
    product_id: data,
  });
  return response.data;
};
export const fetchWishlistRemove = async (id) => {
  const response = await userAxios.delete(`/wishlist/${id}`);
  return response.data;
};
