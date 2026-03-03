'use client'

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { fetchReferrals } from "@/lib/services/referrals_service";
import { CopyButton, HandleCopyText } from "@/components/ui/copy-button";
import { CollapsibleNew } from "@/components/ui/collapsible-new";
import { HandCoins, BookMarked, Link} from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { useRef, useEffect, useState } from 'react';

export default function ReferralsPageClient() {
  const textToCopy = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  }

  const token = getToken();

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);

        if (!token) return;
        const result = await fetchReferrals(token);
  
        setData({
          ...result
        });
      } finally {
        setIsLoading(false);
      }
    }
  
    load();
  }, []);

  console.log(data)

  return (
    <motion.div className='root' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
                        {isLoading ? (
                            <Skeleton className="h-10 w-24 rounded-md" />
                          ) : (
                            <>
                              <p className="text-white text-4xl">{data?.invited}</p>
                            </>
                        )}
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
                        {isLoading ? (
                            <Skeleton className="h-10 w-24 rounded-md" />
                          ) : (
                            <>
                              <p className="text-white text-4xl">{data?.trial}</p>
                            </>
                        )}
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
                    <p className="text-green-500 text-5xl">{data?.total_bonus}<span className="font-mono text-1xl">₽</span></p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex text-white items-center gap-2 text-lg">
                  <Link size={18} className="text-white" /> Ваша ссылка
                </CardTitle>
                <CardDescription className="text-zinc-400">Отправьте её вашим друзьям и получите бонус!</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="h-[45px] flex justify-between items-center bg-zinc-800 p-3 rounded-xl text-xs break-all font-mono">
                  <span ref={textToCopy}>{data?.invite_link}</span>
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