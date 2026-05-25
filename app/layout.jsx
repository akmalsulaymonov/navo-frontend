import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from '@/lib/Providers'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: 'NAVO — Information Agency',
  description: 'Independent journalism. Verified facts. Global perspective.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="flex flex-col min-h-screen bg-white">
        <Providers>
          <Header />
          <main className="flex-1 page-enter">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
