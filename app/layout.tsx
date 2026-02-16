import './globals.css'
import { ProductProvider } from '@/context/ProductContext'
import { CategoryProvider } from '@/context/CategoryContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { ReactNode } from 'react'

export const metadata = {
  title: 'E-Commerce Admin',
  description: 'Admin Dashboard',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <LanguageProvider>
          <ProductProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </ProductProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
