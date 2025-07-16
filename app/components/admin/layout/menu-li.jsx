'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from 'react';

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  badge,
  childrenItems,
  active,
}) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isActive = pathname === href || 
                  pathname.startsWith(`${href}/`) || 
                  (childrenItems && childrenItems.some(child => 
                    pathname === child.href || pathname.startsWith(`${child.href}/`)
                  ));

  const hasChildren = childrenItems && childrenItems.length > 0;

  return (
    <li>
      <div className="flex flex-col">
        <Link
          href={href}
          className={`flex items-center p-3 rounded-md hover:bg-indigo-700 transition-colors ${
            isActive ? 'bg-indigo-700' : ''
          }`}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <Icon className="w-5 h-5 mr-3" />
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
          {hasChildren && (
            isExpanded ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ExpandMoreIcon className="w-4 h-4" />
            )
          )}
        </Link>

        {hasChildren && isExpanded && (
          <ul className="ml-6 mt-1 space-y-1">
            {childrenItems.map((child, index) => {
              const isChildActive = pathname === child.href || pathname.startsWith(`${child.href}/`);
              return (
                <li key={index}>
                  <Link
                    href={child.href}
                    className={`flex items-center p-2 rounded-md hover:bg-indigo-700 ${
                      isChildActive ? 'bg-indigo-700' : ''
                    }`}
                  >
                    <span className="text-sm">{child.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
};

export default SidebarItem;