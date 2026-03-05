'use client'

import './globals.css'
import { BalanceCard } from '@/components/home/BalanceCard';
import { SubscriptionCard } from '@/components/home/SubscriptionCard';
import { SubscriptionKeyCard } from '@/components/home/SubscriptionKeyCard';
import { DevicesCard } from '@/components/home/DevicesCard';
import { DaysLeftCard } from '@/components/home/DaysLeftCard';
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/services/fetchAPI";
import { formatDate, getTimeLeft } from '@/lib/date';
import { useEffect, useState } from 'react';

export default function HomePageClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [hasTrial, setHasTrial] = useState(true);
  const [hasPaid, setHasPaid] = useState(true);

  const hasAnySubscription = !!data?.trial || !!data?.paid;

  const [error_msg, setError] = useState<any>("");

  function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack}`;
    }

    if (typeof error === "string") {
      return error;
    }

    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return "Unknown error";
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initDataRaw = 'tg.initData';
    if (!initDataRaw) {
      console.error("No initData");
      setError("No initData");
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
          const text = await authResponse.text();
          throw new Error(
            `Auth failed: ${authResponse.status} ${authResponse.statusText}\n${text}`
          );
        }
      
        const data = await authResponse.json();
      
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      
      } catch (error) {
        const msg = getErrorMessage(error);
        setError(msg);
        console.error("AUTH ERROR:", error);
        throw error;
      }
    }

    async function load() {
      try {
        setIsLoading(true);

        await initApp();

        const result = await fetchAPI('/api/home', {
          method: 'POST',
          body: JSON.stringify({})
        });
      
        if (!result) {
          throw new Error("Empty response from /api/home");
        }

        const subscriptions = result.subscriptions ?? [];

        const trialSub = subscriptions.find((s: any) =>
          s.type?.includes("trial")
        );

        const paidSub = subscriptions.find((s: any) =>
          !s.type?.includes("trial")
        );

        setHasTrial(!!trialSub);
        setHasPaid(!!paidSub);
      
        setData({
          balance: result.balance,
          trial: trialSub
            ? {
                ...trialSub,
                formattedDate: formatDate(trialSub.end_date),
                daysLeft: getTimeLeft(trialSub.end_date),
              }
            : null,
          paid: paidSub
            ? {
                ...paidSub,
                formattedDate: formatDate(paidSub.end_date),
                daysLeft: getTimeLeft(paidSub.end_date),
              }
            : null,
        });
      
      } catch (error) {
        const msg = getErrorMessage(error);
        setError(msg);
        console.error("HOME LOAD ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleDelete = async (hwid: string) => {
    if (!data?.paid) return;

    const result = await fetchAPI('/api/delete_hwid_user', {
      method: 'POST',
      body: JSON.stringify({ hwid })
    });

    if (!result) {
      throw new Error("Empty response from /api/delete_hwid_user");
    }

    setData((prev: any) => {
      if (!prev?.paid) return prev;

      return {
        ...prev,
        paid: {
          ...prev.paid,
          devices: {
            ...prev.paid.devices,
            total: prev.paid.devices.total - 1,
            devices: prev.paid.devices.devices.filter(
              (d: any) => d.hwid_uuid !== hwid
            ),
          },
        },
      };
    });
  };

  const subscriptionType: 'none' | 'trial' | 'paid' =
          data?.paid ? 'paid'
          : data?.trial ? 'trial'
          : 'none';
              
  const activeSubscription =
    data?.paid ?? data?.trial ?? null;

  const activeKey =
    data?.paid?.subscription_key ??
    data?.trial?.subscription_key ??
    null;

  return (
    <motion.div id='root' className='root' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className='font-bold text-5xl p-5 mt-5'>Главная</h2>
      <div className="min-h-screen text-zinc-100 p-6 z-1 flex justify-center">
        <div className="w-full md:max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid grid-cols-2 gap-4">
              {/*{error_msg && (
                <pre className="text-red-500 text-xs whitespace-pre-wrap bg-zinc-900 p-3 rounded-xl mb-4">
                  {error_msg}
                </pre>
              )}*/}
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
    
            {/* ===== ПОДПИСКИ ===== */}
            <motion.div whileHover={{ scale: 1.01 }}>
              <SubscriptionCard
                label={
                  isLoading
                    ? ""
                    : subscriptionType === 'paid'
                    ? "Текущая подписка"
                    : subscriptionType === 'trial'
                    ? "Бесплатный период"
                    : "Подписка отсутствует"
                }
                status={activeSubscription?.status ?? 'INACTIVE'}
                endDate={activeSubscription?.formattedDate}
                daysLeft={activeSubscription?.daysLeft}
                trafficUsed={activeSubscription?.traffic}
                isLoading={isLoading}
                subscriptionType={subscriptionType}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <SubscriptionKeyCard 
                subscriptionKey={activeKey}
                isLoading={isLoading}
              />
            </motion.div>
    
            <motion.div whileHover={{ scale: 1.01 }}>
              <DevicesCard 
                devices={data?.paid?.devices?.devices ?? []}
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