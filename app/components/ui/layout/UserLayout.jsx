'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

// MUI Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import KeyIcon from '@mui/icons-material/VpnKey';
import ListAltIcon from '@mui/icons-material/ListAlt';

import LayoutPage from './layout';
import ProtectedRouteUser from '../../route/ProtectedRouteUser';
import { useUserAuthContext } from '@/app/context/UserAuthContext';

const menuItems = [
  { href: '/user/profile', icon: <AccountCircleIcon fontSize="small" />, label: 'My Account' },
  { href: '/user/orders', icon: <ListAltIcon fontSize="small" />, label: 'My Orders' },
  { href: '/user/address', icon: <DescriptionIcon fontSize="small" />, label: 'Manage Address' },
  { href: '/user/wishlist', icon: <ShoppingCartIcon fontSize="small" />, label: 'My Wishlist' },
  { href: '/user/change-password', icon: <KeyIcon fontSize="small" />, label: 'Change Password' },
];

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState(pathname);
  const { logout } = useUserAuthContext();

  const handleSelectChange = (e) => {
    const selectedHref = e.target.value;
    if (selectedHref === 'logout') {
      logout();
    } else {
      setSelectedRoute(selectedHref);
      router.push(selectedHref);
    }
  };

  return (
    <ProtectedRouteUser>
      <LayoutPage>
        <div className="account px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Responsive Select for Small Screens */}
            <div className="block lg:hidden">
              <select
                value={selectedRoute}
                onChange={handleSelectChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                {menuItems.map((item, idx) => (
                  <option key={idx} value={item.href}>
                    {item.label}
                  </option>
                ))}
                <option value="logout">Logout</option>
              </select>
            </div>

            {/* Sidebar for Large Screens */}
            <aside className="hidden lg:block w-1/4 bg-white shadow rounded-lg p-4">
              <ul className="space-y-3">
                {menuItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <li
                      key={idx}
                      className={`group transition-all border border-gray-100 rounded-lg hover:bg-gray-50 ${
                        isActive ? 'bg-gray-100' : ''
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-2"
                      >
                        <span
                          className={`p-2 rounded-full flex items-center justify-center transition ${
                            isActive
                              ? 'bg-[#003161] text-white'
                              : 'bg-gray-100 text-gray-700 group-hover:bg-[#003161]/90 group-hover:text-white'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}

                {/* Logout Button */}
                <li>
                  <button
                    onClick={logout}
                    className="flex w-full items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition"
                  >
                    <span className="p-2 rounded-full bg-red-100 text-red-600">
                      <LogoutIcon fontSize="small" />
                    </span>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </li>
              </ul>
            </aside>

            {/* Content Area */}
            <section className="w-full lg:w-3/4 bg-white border border-gray-100 rounded-lg shadow p-4 sm:p-6 h-[80vh] overflow-y-auto">
              {children}
            </section>
          </div>
        </div>
      </LayoutPage>
    </ProtectedRouteUser>
  );
}
