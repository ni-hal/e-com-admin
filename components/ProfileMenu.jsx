'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FiUser, FiLogOut, FiSettings, FiUserPlus } from "react-icons/fi";
export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-lg bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 flex items-center justify-center transition-colors"
        aria-label="User menu"
      >
        <FiUser className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
          >
            <FiUserPlus className="w-4 h-4" />
            Profile
          </button>

          <Link href="/settings"
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
          >
            <FiSettings className="w-4 h-4" />
            Settings
          </Link>

          <hr className="my-1 border-gray-200 dark:border-gray-700" />

          <Link
            href="/"
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
