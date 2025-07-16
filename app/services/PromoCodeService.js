// app/services/PromoCodeService.js

import userAxios from "../lib/axiosUser";

export const checkPromoCode = async (code) => {
  const response = await userAxios.post('/check-promo', { code });
  return response.data;
};
