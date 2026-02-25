import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BottomNav } from "@/components/bottom-nav"
import { Header } from '@/components/header'
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Личный кабинет | VRP VPN",
  description: "Личный кабинет",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="grid-bg"></div>
          <Header />
          
          <div className="pb-24">
            {children}
          </div>

          <BottomNav />
          <Script
            src="https://telegram.org/js/telegram-web-app.js?59"
            strategy="afterInteractive"
          />
      </body>
    </html>
  );
}
