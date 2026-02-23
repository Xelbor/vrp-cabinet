"use client"

import './globals.css'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  CreditCard,
  Wallet,
  Users,
} from "lucide-react"

const items = [
  { label: "Главная", icon: Home, href: "/" },
  { label: "Тарифы", icon: CreditCard, href: "/tariffs" },
  { label: "Баланс", icon: Wallet, href: "/balance" },
  { label: "Рефералы", icon: Users, href: "/referrals" },
]

export function BottomNav() {
  const pathname = usePathname()
  const activeIndex = items.findIndex(i => i.href === pathname)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-auto max-w-md px-3 pb-safe">
        <div className="relative grid grid-cols-4 items-center rounded-2xl backdrop-blur-xl border border-zinc-800/40 py-2 shadow-2xl">
          <div
            className="absolute top-1 bottom-1 rounded-xl bg-white/10 transition-all duration-300"
            style={{
              width: "25%",
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
          {items.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
        
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative z-10 flex flex-col items-center justify-center",
                  "text-xs font-medium",
                  "flex-1",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 mb-1 transition-all",
                    isActive && "scale-110"
                  )}
                />
                <span className="text-[10px]">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
              </div>
            </nav>
          )
        }
