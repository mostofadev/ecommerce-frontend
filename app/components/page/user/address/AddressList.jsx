'use client';

import { FiEdit, FiTrash2, FiHome, FiMapPin, FiPhone, FiBriefcase } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAddress } from '@/app/context/AddressContext';
import Loader from '@/app/components/ui/loader/pageSpinner';

export default function AddressIndex() {
  const router = useRouter();
  const { addresses, loading, removeAddress } = useAddress();
console.log(addresses);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this address?')) {
      try {
        await removeAddress(id);
      } catch (error) {
        console.error('Delete failed', error);
      }
    }
  };

  return (
    <div className="w-full  mx-auto p-4">
      

      {loading ? (
        // <div className="space-y-4">
        //   {[1,2,3,4,5].map((i) => (
        //     <div key={i} className="w-full bg-gray-100 rounded-md p-4 animate-pulse h-32"></div>
        //   ))}
        // </div>
        <Loader />
      ) : addresses?.length === 0 ? (
        <div className="w-full text-center py-8 bg-gray-50 rounded-md border border-gray-200">
          <FiMapPin className="mx-auto text-3xl text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No addresses saved</h3>
          <p className="text-gray-500 mb-4">Add your delivery addresses</p>
          <button
            onClick={() => router.push('/user/address/add')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Add First Address
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`w-full border-b border-gray-100 pb-4 ${addr.is_default ? '' : 'bg-white'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${addr.address_type === 'Office' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {addr.address_type === 'Office' ? <FiBriefcase size={18} /> : <FiHome size={18} />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{addr.name || 'Recipient Name'}</h3>
                    <p className="text-sm text-gray-500">{addr.email || 'Email not set'}</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      
                      <span>{addr.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/user/address/edit/${addr.id}`)}
                    className="text-gray-500 hover:text-blue-600 p-1"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-gray-500 hover:text-red-600 p-1"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="ml-11 text-sm text-gray-700 space-y-1">
                {/* <p>{addr.street_address}</p> */}
                <p>
                  {addr.street_address}, {addr.upazila.name}, {addr.district.name}, {addr.division.name}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
