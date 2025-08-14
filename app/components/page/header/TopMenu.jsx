import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // delivery truck
import ScheduleIcon from '@mui/icons-material/Schedule'; // clock for preorder

const TopMenu = () => {
  return (
    <div className="hidden md:block bg-gray-50 text-sm text-gray-700 px-32 py-2">
      <div className="flex justify-between items-center">
        {/* Left Part */}
        <div>
          Welcome to Sj-mart!
        </div>

        {/* Right Part */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
            <LocalShippingIcon fontSize="small" />
            <span>Track Order</span>
          </div>

          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
            <ScheduleIcon fontSize="small" />
            <span>Pre Order</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
