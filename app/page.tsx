'use client'

import './globals.css'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Progress } from "@/components/ui/progress";
import { DeleteButton } from "@/components/ui/delete-button";
import { CopyButton, HandleCopyText } from "@/components/ui/copy-button";
import { motion } from "framer-motion";
import { Shield, Globe, KeyRound } from 'lucide-react'
import { useRef, useState, useEffect } from 'react';
import { init, miniApp, viewport } from '@telegram-apps/sdk';
 
function App() {
  const textToCopy = useRef<HTMLDivElement>(null)
  const [devices, setDevice] = useState([
    { id: 1, name: "iPhone 11", this: false },
    { id: 2, name: "iPhone 12 Pro Max", this: false },
    { id: 3, name: "PC(Windows)", this: false },
  ])

  const handleDelete = (id: number) => {
    const updatedItems = devices.filter(device => device.id !== id);
    setDevice(updatedItems);
  };

  useEffect(() => {
    const initializeTelegramSDK = async () => {
      try {
        await init();

        if (miniApp.ready.isAvailable()) {
          await miniApp.ready();
          console.log('Mini App готово');
        }

        if (viewport.mount.isAvailable()) {
          await viewport.mount();
          viewport.expand();
        }

        if (viewport.requestFullscreen.isAvailable()) {
          await viewport.requestFullscreen();
        }
      } catch (error) {
        console.error('Ошибка инициализации:', error);
      }
    };

    initializeTelegramSDK();
  }, []);

  

  return (
    <motion.div id='root' className='root' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className='font-bold text-5xl p-5 mt-5'>Главная</h2>
      <div className="min-h-screen text-zinc-100 p-6 z-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl z-1">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white text-lg">
                      Мой баланс
                  </CardTitle>
                  <div className="text-zinc-400"> 
                    <div className='flex justify-between items-start'>
                      <div className='flex flex-col'>
                        <p className="text-white text-4xl">150.00<span className='font-mono font-bold'>₽</span></p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <div className='px-2 '>
                  <Link href="balance">
                  <Button variant="secondary" className="w-full h-8 md:h-10 text-xs md:text-sm bg-zinc-800 hover:bg-zinc-700 cursor-pointer">
                    Пополнить баланс
                  </Button>
                </Link>
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl z-1 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white text-lg">
                    <div className="flex items-center gap-2">
                      Осталось
                    </div>
                  </CardTitle>
                  <div className="text-zinc-400"> 
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <p className="text-white font-bold text-[26px]">35 дней</p>
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
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-white" />
                    Текущая подписка
                  </div>
                  <Badge variant='outline' className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">Активна</Badge>
                </CardTitle>
                <div className="text-zinc-400"> 
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                      <span className='text-zinc-400 text-1xl'>Действует до </span>
                      <p className="text-white">21.12.26</p>
                    </div>
                    
                    <div className='text-right'>
                      <span className='text-zinc-400 text-1xl'>Истекает через</span>
                      <p className="text-white font-bold">35 дней</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className='flex justify-between items-start'>
                  <span className='text-zinc-400 text-sm'>Использовано трафика</span>
                  <p className='font-bold'>0.0 / <span className='font-mono'>∞</span> GB</p>
                </div>
                <div className='space-y-4'>
                  <Progress value={0} />
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>Следующий платеж</span>
                    <span>150<span className='font-mono font-bold'>₽</span> / месяц</span>
                  </div>
                  <Link href="tariffs">
                    <Button variant="secondary" className="w-full text-white cursor-pointer rounded-xl bg-zinc-800 hover:bg-zinc-700">
                      Сменить тариф
                    </Button>
                  </Link>
                </div>
              </CardContent>
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
                  <span ref={textToCopy}>https://de1.sub.vrp-vpn.online/1RKHRjzN586qrDGu</span>
                  <CopyButton onClick={() => HandleCopyText(textToCopy)} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex text-white items-center gap-2 text-1xl">
                  <Globe size={18} className="text-white" /> Подключенные устройства
                </CardTitle>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                    <span>Использовано устройств</span>
                    <span>{devices.length} / 3</span>
                </div>
                <Progress value={devices.length / 3 * 100} />
              </CardHeader>
              <CardContent className="space-y-4">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full text-white cursor-pointer rounded-xl bg-zinc-800 hover:bg-zinc-700"
                    >
                      Управление устройствами
                    </Button>
                  </DrawerTrigger>

                  <DrawerContent className="bg-zinc-950 border-t border-zinc-800">
                    <div className="mx-auto w-full max-w-md pb-6">

                      <DrawerHeader className="text-center space-y-2">
                        <DrawerTitle className="text-xl font-bold text-white">
                          Управление устройствами
                        </DrawerTitle>
                        <DrawerDescription className="text-zinc-400 text-sm">
                          Удаление устройства освободит слот для нового подключения
                        </DrawerDescription>
                      </DrawerHeader>

                      <br></br>

                      <div className="px-4 mb-4">
                        <div className="flex justify-between text-xs text-zinc-500 mb-1">
                          <span>Использовано устройств</span>
                          <span>{devices.length} / 3</span>
                        </div>
                        <Progress value={devices.length / 3 * 100} />
                      </div>

                      <div className="space-y-2 px-4">
                        {devices.map(device => (
                          <Card key={device.id} className="bg-zinc-900/70 border border-zinc-800 rounded-xl px-3 py-2 hover:bg-zinc-800/70 transition">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white">
                                {device.name}
                              </span>
                              {device.this && (
                                <span className="text-xs text-green-400">
                                  Текущее устройство
                                </span>
                              )}
                            </div>

                            <DeleteButton onClick={() => handleDelete(device.id)}></DeleteButton>
                          </div>
                        </Card>
                        ))}
                      </div>

                      <DrawerFooter className="mt-6 px-4 space-y-3">
                        <DrawerClose asChild>
                          <Button
                            className="h-12 text-base rounded-2xl cursor-pointer"
                          >
                            Готово
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
 
export default App