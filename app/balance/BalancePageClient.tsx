'use client'

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CollapsibleNew } from "@/components/ui/collapsible-new";
import { Wallet, CreditCard  } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchBalance, сhargeBalance } from "@/lib/services/balance_service";
import { fetchAPI, getToken } from "@/lib/services/fetchAPI";
import { Skeleton } from "@/components/ui/skeleton";

export default function BalancePage() {
  const [amount, setAmount] = useState<number | "">("");
  const [selected, setSelected] = useState<"bank_card" | "sbp" | null>(null);
  const [error_amount_msg, setAmountError] = useState("");
  const [error_method_msg, setMethodError] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const token = getToken();

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        
        if (!token) return;
        const result = await fetchAPI("/api/balance");

        setData({
          ...result
        });
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountError("");
    const value = Number(e.target.value);
    setAmount(value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.error("No have token");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setAmountError("Введите корректную сумму");
      return;
    }

    if (Number(amount) < 10) {
      setAmountError("Минимальная сумма платежа 10 рублей");
      return;
    }

    if (!selected) {
      setMethodError("Выберите метод оплаты");
      return;
    }

    try {
      const result = await сhargeBalance(amount, selected, token);
      
      if (result && result.payment_link) {
        window.location.href = result.payment_link;
      } else {
        console.error("Ссылка на оплату не получена", result);
      }
    } catch (error) {
      console.error("Ошибка при создании платежа:", error);
    }
  };

  return (
    <motion.div className='root' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className='font-bold text-5xl p-5 mt-5'>Баланс</h2>
      <div className="min-h-screen text-zinc-100 p-6 z-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex text-white items-center gap-2 text-lg">
                  <Wallet size={18} className="text-zinc-400" /> 
                      <span className="text-xl">Мой баланс</span>
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  <div className=""> 
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <span className="text-white text-5xl">
                          {isLoading ? (
                            <Skeleton className="h-10 w-24 rounded-md" />
                          ) : (
                            <>
                              {data?.balance}
                              <span className='font-mono font-bold text-3xl'>₽</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle className="flex text-white items-center gap-2 text-lg">
                    <CreditCard size={18} className="text-white" />
                    <span className="text-xl">Пополнение баланса</span>
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Выберите способ оплаты и сумму
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <CardTitle className="flex text-white items-center gap-2 text-lg">
                      <span className="text-xl">Сумма</span>
                    </CardTitle>
                    <Input 
                      type="number"
                      placeholder="Введите сумму"
                      value={amount}
                      onChange={handleAmountChange}
                      required
                    />
                    <span className="text-xs text-red-500">{error_amount_msg}</span>
                  </div>
                  <div className="space-y-3">
                    <CardTitle className="flex text-white items-center gap-2 text-lg">
                      <span className="text-xl">Метод оплаты</span>
                    </CardTitle>
                    <div className="grid grid-cols-1 gap-3">
                      <div className={`flex items-center justify-between border bg-zinc-800 transition rounded-xl px-4 py-3 cursor-pointer ${selected === "bank_card" ? "border-white" : "border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40"}`} onClick={() => {setSelected("bank_card"); setMethodError("")}}>
                        <div className="flex items-center gap-3">
                          <CreditCard size={24} className="text-white" />
                          <div className="flex flex-col">
                            <div className="text-white">Банковская карта</div>
                            <div className="text-xs text-zinc-400">Visa / MasterCard</div>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center justify-between border bg-zinc-800 transition rounded-xl px-4 py-3 cursor-pointer ${selected === "sbp" ? "border-white" : "border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40"}`} onClick={() => {setSelected("sbp"); setMethodError("")}}>
                        <div className="flex items-center gap-3">
                          <Wallet size={24} className="text-white" />
                          <div className="flex flex-col">
                            <span className="text-white">SBP</span>
                            <span className="text-xs text-zinc-400">Быстрый перевод</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-red-500">{error_method_msg}</span>
                  </div>
                  
                  <Button type="submit" className="w-full rounded-xl cursor-pointer">
                    Пополнить баланс
                  </Button>
                </CardContent>
              </form>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="h-full">
            <CollapsibleNew title="История пополнений">Здесь будет отображаться история ваших пополнений.</CollapsibleNew>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
