'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BottomNav } from "@/components/bottom-nav"
import { Header } from '@/components/header';
import { Toaster } from "@/components/ui/sonner"
import { useEffect, useState } from 'react';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const photo =
      window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url || null

    setPhotoUrl(photo)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="grid-bg"></div>
          <Header photoUrl={photoUrl} />
          
          <div className="pb-24">
            <main>{children}</main>
            <Toaster />
          </div>

          <BottomNav />
      </body>
    </html>
  );
}
