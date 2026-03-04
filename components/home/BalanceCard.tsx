"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  balance: number;
  isLoading: boolean;
}

export function BalanceCard({ balance = 0, isLoading }: Props) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl z-1">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center justify-between text-white text-lg">
              Мой баланс
          </CardTitle>
          <div className="text-zinc-400"> 
            <div className='flex justify-between items-start'>
              <div className='flex flex-col px-1'>
                <span className="text-white text-4xl">
                  {isLoading ? (
                    <Skeleton className="h-10 w-24 rounded-md" />
                  ) : (
                    <>
                      {balance}
                      <span className='font-mono font-bold text-3xl'>₽</span>
                    </>
                  )}
                </span>
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
  );
}