'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'en'
    setLanguage(saved)
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = saved
  }, [])

  const switchLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
