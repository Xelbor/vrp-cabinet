'use client'

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquarePlus } from 'lucide-react';
import { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { fetchAPI } from "@/app/utils/fetchAPI";
import { formatValue } from "@/lib/formatters";
import { toast } from "sonner";


export default function TariffsPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSended, setSended] = useState<boolean>(false);

  const handleBuyKey = (plan: string) => {
    if (isSended) { return };

    setErrorMsg(null);
    setLoading(true);
    
    toast.promise(
      fetchAPI(`/api/buykey`, {
        method: 'POST',
        json: { tariff: plan }
      })
        .then((result) => {
          return result;
        })
        .catch((err: any) => {
          if (err.message.includes("TRIAL_ALREADY_USED")) {
            throw new Error("Вы уже использовали бесплатный период");
          }
          throw new Error("Произошла ошибка при оформлении");
        })
        .finally(() => {
          setLoading(false);
          setSended(false);
        }),
      {
        loading: "Оформление тарифа...",
        success: () => "Подписка успешно оформлена 🎉",
        error: (err) => err.message,
        position: "top-center",
      },
    );
  };

  return (
    <motion.div className='root' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className='font-bold text-5xl p-5 mt-5'>Тарифы</h2>
      <div className="min-h-screen text-zinc-100 p-6 z-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex text-white items-center gap-2 text-lg">
                  <SquarePlus size={20} className="text-zinc-400" /> 
                  <span className="text-xl">Оформление подписки</span>
                </CardTitle>
                <div className="grid grid-cols-1 gap-3">

                  <div className="flex flex-col border bg-zinc-800 transition rounded-xl px-4 py-4 border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40">
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-2xl">{process.env.NEXT_PUBLIC_TARIFF_1_TITLE}</div>
                      <div className="text-xs text-zinc-400">
                        Оформите бесплатный период на {process.env.NEXT_PUBLIC_TARIFF_1_DAYS} дней!
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span>{formatValue(process.env.NEXT_PUBLIC_TARIFF_1_DEVICES!, 'devices')}</span>
                        <div className="flex flex-col items-end">
                          <span>{formatValue(process.env.NEXT_PUBLIC_TARIFF_1_TRAFFIC!, 'traffic')} GB трафика</span>
                          <span className="text-xs text-zinc-500">на месяц</span>
                        </div>
                      </div>
                  
                      <Separator />

                      <div className="my-1">
                        <p className="text-2xl">БЕСПЛАТНО</p>
                      </div>
                  
                      <Button onClick={() => handleBuyKey("trial")} className="w-full cursor-pointer">
                        Оформить
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col border bg-zinc-800 transition rounded-xl px-4 py-4 border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40">
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-2xl">{process.env.NEXT_PUBLIC_TARIFF_2_TITLE}</div>
                      <div className="text-xs text-zinc-400">
                        Тариф на {process.env.NEXT_PUBLIC_TARIFF_2_DAYS} дней
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span>{formatValue(process.env.NEXT_PUBLIC_TARIFF_2_DEVICES!, 'devices')}</span>
                        <div className="flex flex-col items-end">
                          <span>{formatValue(process.env.NEXT_PUBLIC_TARIFF_2_TRAFFIC!, 'traffic')} GB трафика</span>
                          <span className="text-xs text-zinc-500">на месяц</span>
                        </div>
                      </div>
                  
                      <Separator />

                      <div className="my-1">
                        <p className="text-2xl">{process.env.NEXT_PUBLIC_TARIFF_2_AMOUNT}<span className='font-mono font-bold'>₽</span> / месяц</p>
                      </div>
                  
                      <Button onClick={() => handleBuyKey("paid_1")} className="w-full cursor-pointer">
                        Купить
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col border bg-zinc-800 transition rounded-xl px-4 py-4 border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40">
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-2xl">{process.env.NEXT_PUBLIC_TARIFF_3_TITLE}</div>
                      <div className="text-xs text-zinc-400">
                        Тариф на {process.env.NEXT_PUBLIC_TARIFF_3_DAYS} дней
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span>{formatValue(process.env.NEXT_PUBLIC_TARIFF_3_DEVICES!, 'devices')} устройств</span>
                        <div className="flex flex-col items-end">
                          <span>{formatValue(process.env.NEXT_PUBLIC_TARIFF_3_TRAFFIC!, 'traffic')} GB трафика</span>
                          <span className="text-xs text-zinc-500">на месяц</span>
                        </div>
                      </div>
                  
                      <Separator />

                      <div className="my-1">
                        <p className="text-2xl">{process.env.NEXT_PUBLIC_TARIFF_3_AMOUNT}<span className='font-mono font-bold'>₽</span> / месяц</p>
                      </div>
                  
                      <Button onClick={() => handleBuyKey("paid_2")} className="w-full cursor-pointer">
                        Купить
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col border bg-zinc-800 transition rounded-xl px-4 py-4 border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40">
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-2xl">{process.env.NEXT_PUBLIC_TARIFF_4_TITLE}</div>
                      <div className="text-xs text-zinc-400">
                        Тариф на {process.env.NEXT_PUBLIC_TARIFF_4_DAYS} дней
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span>{formatValue(process.env.NEXT_PUBLIC_TARIFF_4_DEVICES!, 'devices')} устройств</span>
                        <div className="flex flex-col items-end">
                          <span>{formatValue(process.env.NEXT_PUBLIC_TARIFF_4_TRAFFIC!, 'traffic')} GB трафика</span>
                          <span className="text-xs text-zinc-500">на месяц</span>
                        </div>
                      </div>
                  
                      <Separator />

                      <div className="my-1">
                        <p className="text-2xl">{process.env.NEXT_PUBLIC_TARIFF_4_AMOUNT}<span className='font-mono font-bold'>₽</span> / месяц</p>
                      </div>
                  
                      <Button onClick={() => handleBuyKey("paid_3")} className="w-full cursor-pointer">
                        Купить
                      </Button>
                    </div>
                  </div>

                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}