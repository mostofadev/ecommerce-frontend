import userAxios from "../lib/axiosUser";
export const getDivisions = async () => {
  const response = await userAxios.get("/location/divisions");
  return response.data.data;
};

export const getDistrictsByDivision = async (divisionId) => {
  const response = await userAxios.get(
    `/location/divisions/${divisionId}/districts`
  );
  return response.data.data;
};

export const getUpazilasByDistrict = async (districtId) => {
  const response = await userAxios.get(
    `/location/districts/${districtId}/upazilas`
  );
  return response.data.data;
};
