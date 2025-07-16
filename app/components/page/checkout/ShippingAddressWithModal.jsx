'use client';

import { useState, useEffect } from 'react';
import { useAddress } from '@/app/context/AddressContext';
import LinkButton from '../../ui/button/LinkButton';

export default function ShippingAddressWithModal({
  addresses,
  onShippingSelect,
  onBillingSelect
}) {
  const { selectAddressUpdate } = useAddress();

  const selectedAddress = addresses.find((addr) => addr.is_selected);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localSelectedId, setLocalSelectedId] = useState(
    selectedAddress ? selectedAddress.id : null
  );

  useEffect(() => {
    if (selectedAddress) {
      setLocalSelectedId(selectedAddress.id);
      onShippingSelect?.(selectedAddress.id);
      onBillingSelect?.(selectedAddress.id);
    }
  }, [selectedAddress]);

  const handleChangeClick = () => {
    setIsModalOpen(true);
  };

  const handleSelectAddress = async (id) => {
    setLocalSelectedId(id);
    await selectAddressUpdate(id);
    setIsModalOpen(false);

    onShippingSelect?.(id);
    onBillingSelect?.(id);
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">Shipping Address</h2>
        {selectedAddress ? (
          <p className="text-sm text-gray-600">
            {selectedAddress.street_address}, 
            {selectedAddress.upazila?.name}, 
            {selectedAddress.district?.name}, 
            {selectedAddress.division?.name}
          </p>
        ) : (
          <p className="text-sm text-gray-600">No address selected</p>
        )}
 <button
            onClick={handleChangeClick}
            className="text-blue-600 text-sm mt-2 hover:underline"
          >
            Change
          </button>


        {/* {selectedAddress ? (
          <button
            onClick={handleChangeClick}
            className="text-blue-600 text-sm mt-2 hover:underline"
          >
            Change
          </button>
        ) : (
          <a
            href="/user/address/add"
            className="text-blue-600 text-sm mt-2 hover:underline"
          >
            Add Address
          </a>
        // )} */}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Select Shipping Address</h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {addresses.map((addr) =>
  addr ? (
    <label
      key={addr.id}
      className={`block cursor-pointer border p-3 rounded-lg transition-all ${
        addr.id === localSelectedId
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start">
        <input
          type="radio"
          name="shippingAddress"
          value={addr.id}
          checked={addr.id === localSelectedId}
          onChange={() => handleSelectAddress(addr.id)}
          className="mt-1 mr-3 accent-indigo-600"
        />
        <div>
          <p className="text-sm font-medium">
            {addr.name} ({addr.label || 'No Label'})
          </p>
          <p className="text-xs text-gray-600">
            {addr.street_address}, {addr.upazila?.name}, {addr.district?.name}, {addr.division?.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {addr.phone} {addr.email && `| ${addr.email}`}
          </p>
        </div>
      </div>
    </label>
  ) : null
    
  
)}

            </div>

            <div className="flex justify-between gap-2 mt-6">
              <LinkButton href="/user/address/add">
                Add Address
              </LinkButton>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
