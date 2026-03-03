'use client'

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquarePlus } from 'lucide-react';
import { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { buyKey } from "@/lib/services/tariffs_service";
import { getToken } from "@/lib/services/fetchAPI";
import { toast } from "sonner";


export default function TariffsPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const token = getToken();

  const handleBuyKey = (id: string, plan: string) => {
    setErrorMsg(null);
    setLoading(true);

    if (!token) return;

    toast.promise(
      buyKey(plan, token)
        .then((result) => {
          return result;
        })
        .catch((err: any) => {
          if (err.message === "TRIAL_ALREADY_USED") {
            throw new Error("Вы уже использовали бесплатный период");
          }
          throw new Error("Произошла ошибка при оформлении");
        })
        .finally(() => {
          setLoading(false);
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
                      <div className="text-white text-2xl">Бесплатный период</div>
                      <div className="text-xs text-zinc-400">
                        Оформите бесплатный период на 15 дней!
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span>3 устройства</span>
                        <span>∞ трафик</span>
                      </div>
                  
                      <Separator />

                      <div className="my-1">
                        <p className="text-2xl">БЕСПЛАТНО</p>
                      </div>
                  
                      <Button onClick={() => handleBuyKey(userId, "trial")} className="w-full cursor-pointer">
                        Оформить
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col border bg-zinc-800 transition rounded-xl px-4 py-4 border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40">
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-2xl">Тариф "Старт"</div>
                      <div className="text-xs text-zinc-400">
                        Тариф на 14 дней
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span>3 устройства</span>
                        <span>∞ трафик</span>
                      </div>
                  
                      <Separator />

                      <div className="my-1">
                        <p className="text-2xl">85<span className='font-mono font-bold'>₽</span> / месяц</p>
                      </div>
                  
                      <Button onClick={() => handleBuyKey(userId, "paid_1")} className="w-full cursor-pointer">
                        Купить
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col border bg-zinc-800 transition rounded-xl px-4 py-4 border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40">
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-2xl">30 дней</div>
                      <div className="text-xs text-zinc-400">
                        Тариф на 30 дней
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span>3 устройства</span>
                        <span>∞ трафик</span>
                      </div>
                  
                      <Separator />

                      <div className="my-1">
                        <p className="text-2xl">150<span className='font-mono font-bold'>₽</span> / месяц</p>
                      </div>
                  
                      <Button onClick={() => handleBuyKey(userId, "paid_2")} className="w-full cursor-pointer">
                        Купить
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col border bg-zinc-800 transition rounded-xl px-4 py-4 border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40">
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-2xl">2 месяца</div>
                      <div className="text-xs text-zinc-400">
                        Тариф на 60 дней
                      </div>

                      <div className="flex justify-between text-sm mt-2">
                        <span>3 устройства</span>
                        <span>∞ трафик</span>
                      </div>
                  
                      <Separator />

                      <div className="my-1">
                        <p className="text-2xl">270<span className='font-mono font-bold'>₽</span> / месяц</p>
                      </div>
                  
                      <Button onClick={() => handleBuyKey(userId, "paid_3")} className="w-full cursor-pointer">
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