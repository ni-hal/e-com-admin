import './globals.css'
import { ProductProvider } from '@/context/ProductContext'
import { CategoryProvider } from '@/context/CategoryContext'

export const metadata = {
  title: 'E-Commerce Admin',
  description: 'Admin Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </ProductProvider>
      </body>
    </html>
  )
}
