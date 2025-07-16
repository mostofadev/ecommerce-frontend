import userAxios from "../lib/axiosUser";

export const fetchAddressIndex = async () => {
  const response = await userAxios.get(`/addresses`);
  return response.data;
};

export const fetchAddressAdd = async (data) => {
  const response = await userAxios.post(`/addresses`, data);
  return response.data;
};

export const fetchAddressSingle = async (id) => {
  const response = await userAxios.get(`/addresses/${id}`);
  return response.data;
};

export const fetchAddressUpdate = async (id, data) => {
  const response = await userAxios.put(`/addresses/${id}`, data);
  return response.data;
};

export const fetchAddressRemove = async (id) => {
  const response = await userAxios.delete(`/addresses/${id}`);
  return response.data;
};


export const fetchSelectAddressUpdate = async (address_id) => {
  const response = await userAxios.put('/address/select', { address_id });
  return response.data;
};
