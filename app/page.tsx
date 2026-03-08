import HomePageClient from '@/app/HomePage';
import Script from 'next/script';

export default function Page() {
  if (typeof window === 'undefined') return;
  
  window.Telegram?.WebApp?.expand();

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js?60"
        strategy="beforeInteractive"
      />
      <HomePageClient />
    </>
  );
}