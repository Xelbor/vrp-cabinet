'use client'

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CopyButton, HandleCopyText } from "@/components/ui/copy-button";
import { CollapsibleNew } from "@/components/ui/collapsible-new";
import { HandCoins, BookMarked, KeyRound} from 'lucide-react';
import { useRef } from 'react'

export default function BalancePage() {
  const textToCopy = useRef<HTMLDivElement>(null)

  return (
    <motion.div className='screen' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className='font-bold text-5xl p-5 mt-5'>Рефералы</h2>
      <div className="min-h-screen text-zinc-100 p-6 z-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl z-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white text-[15px]">
                    <div className="flex items-center gap-2">
                      Пользователей приглашено
                    </div>
                  </CardTitle>
                  <div className="text-zinc-400"> 
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <p className="text-white text-4xl">5</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="h-full bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl z-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white text-[15px]">
                    <div className="flex items-center gap-2">
                      Подписок активно
                    </div>
                  </CardTitle>
                  <div className="text-zinc-400"> 
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <p className="text-white text-4xl">3</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl z-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white text-lg">
                  <div className="flex items-center gap-2 text-2xl">
                    <HandCoins size={18} className="text-white" />
                    Всего заработано
                  </div>
                </CardTitle>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <p className="text-green-500 text-5xl">125<span className="font-mono text-1xl">₽</span></p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex text-white items-center gap-2 text-lg">
                  <KeyRound size={18} className="text-white" /> Ключ подключения
                </CardTitle>
                <CardDescription className="text-zinc-400">Перейдите по ссылке для получения инструкции, или же просто вставьте в приложение</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="h-[45px] flex justify-between items-center bg-zinc-800 p-3 rounded-xl text-xs break-all font-mono">
                  <span ref={textToCopy}>https://t.me/vrp_vpn_bot?start=ref_9xuawf</span>
                  <CopyButton onClick={() => HandleCopyText(textToCopy)} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <CollapsibleNew title={
              <>
                <BookMarked size={18} className="text-white" /> Правила рефералов
              </>
              }>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Вы получаете 25 ₽ за каждого пользователя, который оформил подписку по вашей реферальной ссылке.
                    <br /><br />
                    Если пользователь просто перешёл по ссылке, но не оформил подписку — он учитывается только в категории «Пользователей приглашено».
                    <br /><br />
                    Если пользователь оформил подписку — он учитывается в обеих категориях:
                    «Пользователей приглашено» и «Подписок активно», а вам начисляется бонус.
                  </p>
                </div>
              </div>
            </CollapsibleNew>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}