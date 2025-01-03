import { ClerkProvider } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';
import './globals.css';

export const metadata = {
  title: 'College Marketplace',
  description: 'Buy, sell, or give away secondhand items for college students',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider
          appearance={{
            baseTheme: neobrutalism,
          }}
      >
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
      </ClerkProvider>
  );
}


