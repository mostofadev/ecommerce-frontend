import userAxios from "../lib/axiosUser";

// ✅ 1. Get user profile
export const getUserProfile = async () => {
   const token = localStorage.getItem('user_token');
  const res = await userAxios.get('/profile');
  return res.data;
};

// ✅ 2. Update user profile
export const updateUserProfile = async (formData) => {
  const res = await userAxios.post('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};


// ✅ 3. Check if password is set
export const getPasswordStatus = async () => {
  const res = await userAxios.get("/user/password-status");
  return res.data; // { has_password: true/false }
};

// ✅ 4. Update or set password
export const updatePassword = async (formData) => {
  const res = await userAxios.post("/user/password", formData);
  return res.data;
};