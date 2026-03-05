"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/ui/delete-button";
import { Progress } from "@/components/ui/progress";
import { Globe } from 'lucide-react';
import { definePlatformIcon } from '@/lib/format';

interface Device {
  platform: string;
  hwid_uuid: string;
  device_model: string;
}

interface Props {
  devices: Device[];
  isLoading: boolean;
  onDelete: (hwid: string) => void;
}

export function DevicesCard({ devices, isLoading, onDelete }: Props) {
    return (
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
                              {devices.map((device, index) => (
                                <Card
                                  key={index}
                                  className="bg-zinc-900/70 border border-zinc-800 rounded-xl px-3 py-2 hover:bg-zinc-800/70 transition"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      {definePlatformIcon(device.platform)}
                                      <span className="text-sm font-medium text-white">
                                        {device.device_model}
                                      </span>
                                    </div>
                            
                                    <DeleteButton onClick={() => onDelete(device.hwid_uuid)} />
                                  </div>
                                </Card>
                              ))}
                            </div>

                            <DrawerFooter className="mt-6 px-4 space-y-3">
                                <DrawerClose asChild>
                                <Button className="h-12 text-base rounded-2xl cursor-pointer">
                                    Готово
                                </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </CardContent>
        </Card>
    )
}