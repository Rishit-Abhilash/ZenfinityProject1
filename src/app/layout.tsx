import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/components/providers/DataProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Zenfinity Energy - Battery Analytics Dashboard',
  description: 'Advanced battery cycle analytics and performance insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </DataProvider>
      </body>
    </html>
  );
}
