"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bytesToGiB } from '@/lib/format';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from 'lucide-react';
import Link from "next/link";

interface Props {
  label?: string;
  status?: string;
  endDate?: string;
  daysLeft?: string;
  trafficUsed?: number;
  isLoading: boolean;
  subscriptionType: 'none' | 'trial' | 'paid' | 'partner';
}

function renderActionButton(type: 'none' | 'trial' | 'paid' | 'partner') {
  switch (type) {
    case 'none':
      return (
        <Link href="tariffs">
          <Button className="w-full rounded-xl cursor-pointer">
            Оформить подписку
          </Button>
        </Link>
      );

    case 'trial':
      return (
        <Button variant="secondary" className="w-full rounded-xl">
          Перейти на платный тариф
        </Button>
      );

    case 'paid':
      return (
        <Link href="tariffs">
          <Button
            variant="secondary"
            className="w-full text-white cursor-pointer rounded-xl bg-zinc-800 hover:bg-zinc-700"
          >
            Сменить тариф
          </Button>
        </Link>
      );
  }
}

function defineStatus(status: string ) {
  switch (status) {
    case 'ACTIVE': return <Badge variant='outline' className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">Активна</Badge>
    case 'EXPIRED': return <Badge variant='destructive' className="bg-green-50 text-red-700 dark:bg-red-950 dark:text-red-300">Истекла</Badge>
    case 'INACTIVE': return <Badge variant='destructive' className="bg-green-50 text-red-700 dark:bg-red-950 dark:text-red-300">Неактивна</Badge>
  } 
}

export function SubscriptionCard({ label, status, endDate, daysLeft, trafficUsed = 0, isLoading, subscriptionType }: Props) {
  const effectiveType = isLoading ? 'none' : subscriptionType;

  return (
    <Card className="bg-zinc-900 border-zinc-800 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white text-lg">
          <div className="flex items-center gap-2">
            <Shield size={18} />
            {isLoading ? (
              <Skeleton className="h-5 w-32 rounded-md" />
            ) : (
              label
            )}
          </div>

          {!isLoading && status && defineStatus(status)}
        </CardTitle>

        <div className="text-zinc-400">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span>Действует до</span>
              {isLoading ? (
                <Skeleton className="h-5 w-24 rounded-md" />
              ) : (
                <span className="text-white">
                  {effectiveType === 'none' ? '—' : endDate}
                </span>
              )}
            </div>

            <div className="text-right">
              <span>Истекает через</span>
              {isLoading ? (
                <Skeleton className="h-5 w-24 rounded-md" />
              ) : (
                <p className="text-white font-bold">
                  {effectiveType === 'none' ? '—' : `${daysLeft} дней`}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-zinc-400 text-sm">
            Использовано трафика
          </span>

          {isLoading ? (
            <Skeleton className="h-5 w-24 rounded-md" />
          ) : effectiveType === 'none' ? (
            <span className="text-zinc-500">—</span>
          ) : (
            <p className="font-bold">
              {bytesToGiB(trafficUsed)} / ∞ GB
            </p>
          )}
        </div>

        <Progress value={0} />

        {renderActionButton(effectiveType)}
      </CardContent>
    </Card>
  );
}