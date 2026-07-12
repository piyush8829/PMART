import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'PMART | The Billion-Dollar Premium Luxury & Tech Concept Store',
  description: 'Explore PMART—the ultimate e-commerce showcase featuring carbon fiber aesthetics, glowing crimson accents, glassmorphic interfaces, and curated elite-tier products.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body 
        className="bg-[#0D0D0D] text-gray-100 font-sans antialiased selection:bg-[#FF1E1E] selection:text-white overflow-x-hidden min-h-screen"
        suppressHydrationWarning
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
