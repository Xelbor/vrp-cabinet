'use client'

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CollapsibleNew } from "@/components/ui/collapsible-new";
import { Wallet, CreditCard  } from 'lucide-react';
import { useState } from 'react'

export default function BalancePage() {
  const [selected, setSelected] = useState<"card" | "sbp" | null>(null);

  return (
    <motion.div className='screen' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
                          <p className="text-white text-5xl">150.00<span className='font-mono font-bold'>₽</span></p>
                        </div>
                      </div>
                    </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
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
                      className="number-input"
                    />
                  </div>
                  <div className="space-y-3">
                    <CardTitle className="flex text-white items-center gap-2 text-lg">
                      <span className="text-xl">Метод оплаты</span>
                    </CardTitle>
                    <div className="grid grid-cols-1 gap-3">
                      <div className={`flex items-center justify-between border bg-zinc-800 transition rounded-xl px-4 py-3 cursor-pointer ${selected === "card" ? "border-white" : "border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40"}`} onClick={() => setSelected("card")}>
                        <div className="flex items-center gap-3">
                          <CreditCard size={24} className="text-white" />
                          <div className="flex flex-col">
                            <div className="text-white">Банковская карта</div>
                            <div className="text-xs text-zinc-400">Visa / MasterCard</div>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center justify-between border bg-zinc-800 transition rounded-xl px-4 py-3 cursor-pointer ${selected === "sbp" ? "border-white" : "border-zinc-700 hover:border-white/40 hover:bg-zinc-700/40"}`} onClick={() => setSelected("sbp")}>
                        <div className="flex items-center gap-3">
                          <Wallet size={24} className="text-white" />
                          <div className="flex flex-col">
                            <span className="text-white">SBP</span>
                            <span className="text-xs text-zinc-400">Быстрый перевод</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <br />
                  <Button className="w-full rounded-xl cursor-pointer">
                    Пополнить баланс
                  </Button>
                </CardContent>
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