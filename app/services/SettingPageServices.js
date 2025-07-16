import axios  from "../lib/axiosInstance";

export const fetchBanner =async () => {
  const response = await axios.get(`/banner`);
  console.log(response);
  
  return response.data;
}