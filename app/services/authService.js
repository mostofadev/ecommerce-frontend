import axios from "../lib/axiosInstance";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/admin/login", { email, password });
    return response;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
};
