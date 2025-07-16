import axios from  '../lib/axiosInstance'

export const loginUser = async (email,password)=> {
  try {
const response = await axios.post('/admin/login', { email, password })
console.log(response);

  return response;
  } catch (error) {
   const message = error.response?.data?.message || 'Something went wrong';
    //console.error("Login Error:", message);
    throw new Error(message);
  }
  
}