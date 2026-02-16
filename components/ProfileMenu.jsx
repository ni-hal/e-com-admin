'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FiUser, FiLogOut, FiSettings, FiUserPlus, FiGlobe } from "react-icons/fi";
import { useLanguage } from '../context/LanguageContext';
export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef(null);
  const langRef = useRef(null);
  const router = useRouter();
  const { language, switchLanguage } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center gap-3">
      {/* Language Switcher */}
      <div className="relative" ref={langRef}>
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="h-10 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 flex items-center gap-2 text-white transition-colors"
          aria-label="Language"
        >
          <FiGlobe className="w-5 h-5" />
          {language === 'ar' ? 'عربي' : 'English'}
        </button>

        {langOpen && (
          <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
            <button
              onClick={() => { switchLanguage('en'); setLangOpen(false); }}
              className="w-full px-4 py-2 ltr:text-left rtl:text-right text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              English
            </button>
            <button
              onClick={() => { switchLanguage('ar'); setLangOpen(false); }}
              className="w-full px-4 py-2 ltr:text-left rtl:text-right text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              عربي
            </button>
          </div>
        )}
      </div>

      {/* Profile Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors"
          aria-label="User menu"
        >
          <FiUser className="w-5 h-5 text-white" />
        </button>

        {isOpen && (
          <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 ltr:text-left rtl:text-right text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <FiUserPlus className="w-4 h-4" />
              Profile
            </button>

            <Link href="/settings"
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 ltr:text-left rtl:text-right text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <FiSettings className="w-4 h-4" />
              Settings
            </Link>

            <hr className="my-1 border-gray-200 dark:border-gray-700" />

            <Link
              href="/"
              onClick={handleLogout}
              className="w-full px-4 py-2 ltr:text-left rtl:text-right text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
