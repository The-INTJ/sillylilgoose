import './globals.scss'
import AppShell from '@/components/AppShell';

export const metadata = {
  title: 'App For Adeline',
  description: 'App For Adeline',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="spring">
      <body><AppShell>{children}</AppShell></body>
    </html>
  )
}
