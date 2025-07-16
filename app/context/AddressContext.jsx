'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchSelectAddressUpdate,
  fetchAddressIndex,
  fetchAddressAdd,
  fetchAddressSingle,
  fetchAddressUpdate,
  fetchAddressRemove,
} from '../services/AddressServices';
import { getTokenFromLocal } from '../lib/getTokenFromLocal';
import { showCustomToast } from '../lib/showCustomToast';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [SingleAddress, setSingleAddress] = useState([]);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const data = await fetchAddressIndex();
      setAddresses(data.data);
    } catch (err) {
      setError(err?.message || 'Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (addressData) => {
    setLoading(true);
    try {
      const data = await fetchAddressAdd(addressData);
      showCustomToast({
        title: "Added to Address",
        message: "Address Added Successfully.",
        type: "success",
      });
      await loadAddresses();
      return data;
    } catch (err) {
  const errorMsg =
    err?.response?.data?.message || 'Failed to add address';

  // Laravel validation error হলে সেটা দেখাবে
  if (err?.response?.status === 422 && err?.response?.data?.errors) {
    const firstField = Object.keys(err.response.data.errors)[0];
    const firstMessage = err.response.data.errors[firstField][0];

    showCustomToast({
      title: "Validation Error",
      message: firstMessage,
      type: "error",
    });
  } else {
    showCustomToast({
      title: "Something Went Wrong",
      message: errorMsg,
      type: "error",
    });
  }

  setError(errorMsg);
  //throw err;
} finally {
      setLoading(false);
    }
  };

  const getAddressById = async (id) => {
    setLoading(true);
    try {
      const data = await fetchAddressSingle(id);
      await loadAddresses();
      setSingleAddress(data.data);
    } catch (err) {
      setError(err?.message || 'Failed to load address');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id, updateData) => {
    setLoading(true);
    try {
      const updated = await fetchAddressUpdate(id, updateData);
      setAddresses((prev) => prev.map((item) => (item.id === id ? updated : item)));
      showCustomToast({
        title: "Update to Address",
        message: "Address Update Successfully.",
        type: "success",
      });
      await loadAddresses();
      return updated;
    } catch (err) {
      setError(err?.message || 'Failed to update address');
      showCustomToast({
        title: "Something Is Wrong",
        message: "Something Is Wrong!",
        type: "error",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeAddress = async (id) => {
    setLoading(true);
    try {
      await fetchAddressRemove(id);
      setAddresses((prev) => prev.filter((item) => item.id !== id));
      showCustomToast({
        title: "Remove to Address",
        message: "Address Remove Successfully.",
        type: "success",
      });
      await loadAddresses();
    } catch (err) {
      setError(err?.message || 'Failed to delete address');
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const selectAddressUpdate = async (address_id) => {
  try {
    await fetchSelectAddressUpdate(address_id);
    await loadAddresses(); 
  } catch (err) {
    console.error("Failed to select address:", err);
  }
};
  useEffect(() => {
    const token = getTokenFromLocal();
    if (token) {
      loadAddresses();
    }
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        SingleAddress,
        loading,
        error,
        loadAddresses,
        addAddress,
        getAddressById,
        updateAddress,
        removeAddress,
        selectAddressUpdate
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
