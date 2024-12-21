import { ClerkProvider } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
import { Inter } from 'next/font/google'
import './globals.css'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from "@/lib/utils";

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
          <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
          )}
        />
        {children}
      </body>
      </html>
    </ClerkProvider>
  )
}

