import { useState, useEffect } from 'react';
import { Vendor } from '../types';
import { getLocalData } from '../utils';
import { INITIAL_VENDORS } from '../constants';

export const useVendor = () => {
  const [vendors, setVendors] = useState<Vendor[]>(() => getLocalData("vendors", INITIAL_VENDORS));

  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);

  const addVendor = (vendor: Vendor) => {
    if (vendor.name) {
      setVendors((prevVendors) => [...prevVendors, vendor]);
    }
  };

  return {
    vendors,
    addVendor,
  };
}; 