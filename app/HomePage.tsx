'use client'

import './globals.css'
import { BalanceCard } from '@/components/home/BalanceCard';
import { SubscriptionCard } from '@/components/home/SubscriptionCard';
import { SubscriptionKeyCard } from '@/components/home/SubscriptionKeyCard';
import { DevicesCard } from '@/components/home/DevicesCard';
import { DaysLeftCard } from '@/components/home/DaysLeftCard';
import { motion } from "framer-motion";
import { fetchHome, deleteDevice } from '@/lib/services/home_service';
import { formatDate, getTimeLeft } from '@/lib/date';
import { useEffect, useState } from 'react';

export default function HomePageClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    
    tg.ready();
    
    const initDataRaw = tg.initData;
    if (!initDataRaw) {
      console.error("No initData");
      return;
    }
    
    load();
  
    async function initApp() {
      try {
        const authResponse = await fetch('/api/auth/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData: initDataRaw })
        });
      
        if (!authResponse.ok) {
          throw new Error("Auth failed");
        }
      
        const data = await authResponse.json();
      
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    async function load() {
      try {
        setIsLoading(true);
      
        const hasToken = localStorage.getItem("access_token");
        if (!hasToken) {
          await initApp();
        }

        const response = await fetchHome(data.access_token);
      
        if (!response.ok) {
          throw new Error("Failed to load home");
        }
      
        const result = await response.json();
      
        setData({
          ...result,
          formattedDate: formatDate(result.end_date),
          daysLeft: getTimeLeft(result.end_date),
        });
      
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleDelete = async (hwid: string) => {
    //if (!userId) return;

    //if (!token) return;
    //await deleteDevice(userId, hwid, token);
    setData((prev: any) => ({
      ...prev,
      user_devices: {
        devices: prev.user_devices.devices.filter(
          (d: any) => d.hwid_uuid !== hwid
        ),
      },
    }));
  };

  return (
    <motion.div id='root' className='root' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className='font-bold text-5xl p-5 mt-5'>Главная</h2>
      <div className="min-h-screen text-zinc-100 p-6 z-1 flex justify-center">
        <div className="w-full md:max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }}>
                 <BalanceCard
                    balance={data?.balance}
                    isLoading={isLoading}
                  />
              </motion.div>
    
              <motion.div whileHover={{ scale: 1.02 }}>
                <DaysLeftCard 
                  daysLeft={data?.daysLeft}
                  isLoading={isLoading}
                />
              </motion.div>
            </div>
    
            <motion.div whileHover={{ scale: 1.01 }}>
              <SubscriptionCard
                status={data?.status}
                endDate={data?.formattedDate}
                daysLeft={data?.daysLeft}
                trafficUsed={data?.user_traffic}
                isLoading={isLoading}
              />
            </motion.div>
    
            <motion.div whileHover={{ scale: 1.01 }}>
              <SubscriptionKeyCard 
                subscriptionKey={data?.subscription_key}
                isLoading={isLoading}
              />
            </motion.div>
    
            <motion.div whileHover={{ scale: 1.01 }}>
              <DevicesCard 
                devices={data?.user_devices?.devices ?? []}
                isLoading={isLoading}
                onDelete={handleDelete}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}