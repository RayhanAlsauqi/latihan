
import { ReactNode } from 'react';
import { AuthProvider } from './context/auth.context';
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  )
}