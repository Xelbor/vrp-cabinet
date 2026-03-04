"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  daysLeft: number;
  isLoading: boolean;
}

export function DaysLeftCard({ daysLeft = 0, isLoading }: Props) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl z-1 h-full">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center justify-between text-white text-lg">
          <div className="flex items-center gap-2">
            Осталось
          </div>
        </CardTitle>
        <div className="text-zinc-400"> 
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
              {isLoading ? (
                <Skeleton className="h-10 w-24 rounded-md" />
              ) : (
                <>
                  <span className="text-white font-bold text-[26px]">{daysLeft}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}