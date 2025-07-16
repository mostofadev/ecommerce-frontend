'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
} from '../services/LocationServices';
import { getTokenFromLocal } from '../lib/getTokenFromLocal';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDivisions = async () => {
    setLoading(true);
    try {
      const data = await getDivisions();
      console.log(data);
      
      setDivisions(data);
    } catch (error) {
      console.error('Failed to load divisions', error);
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
      console.error('Failed to load districts', error);
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
      console.error('Failed to load upazilas', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getTokenFromLocal();
    if (token) {
      loadDivisions(); // ✅ Token থাকলেই API call
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
