import axios from "../lib/axiosInstance";

export const fetchBanner = async () => {
  const response = await axios.get(`/banner`);
  return response.data;
};
