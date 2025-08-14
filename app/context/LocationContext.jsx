"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from "../services/LocationServices";
import { getTokenFromLocal } from "../lib/getTokenFromLocal";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadDivisions = async () => {
    setLoading(true);
    try {
      const data = await getDivisions();
      setDivisions(data);
    } catch (error) {
      setError("Failed to load Division");
    } finally {
      setLoading(false);
    }
  };

  const loadDistricts = async (divisionId) => {
    setLoading(true);
    try {
      const data = await getDistrictsByDivision(divisionId);
      setDistricts(data);
    } catch (error) {
      setError("Failed to load districts");
    } finally {
      setLoading(false);
    }
  };

  const loadUpazilas = async (districtId) => {
    setLoading(true);
    try {
      const data = await getUpazilasByDistrict(districtId);
      setUpazilas(data);
    } catch (error) {
      setError("Failed to load upazilas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getTokenFromLocal();
    if (token) {
      loadDivisions();
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        divisions,
        districts,
        upazilas,
        loadDistricts,
        loadUpazilas,
        loading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
