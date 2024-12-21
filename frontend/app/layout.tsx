import { ClerkProvider } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'College Marketplace',
  description: 'Buy, sell, or give away secondhand items for college students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
        {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

