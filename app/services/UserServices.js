import userAxios from "../lib/axiosUser";

export const getUserProfile = async () => {
  const token = localStorage.getItem("user_token");
  const res = await userAxios.get("/profile");
  return res.data;
};

export const updateUserProfile = async (formData) => {
  const res = await userAxios.post("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getPasswordStatus = async () => {
  const res = await userAxios.get("/user/password-status");
  return res.data;
};

export const updatePassword = async (formData) => {
  const res = await userAxios.post("/user/password", formData);
  return res.data;
};
