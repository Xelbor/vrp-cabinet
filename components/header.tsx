'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

export function Header() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  useEffect(() => {
    const photo =
      window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url || null

    setPhotoUrl(photo)
  }, [])

  return(
    <div className='header w-full h-20 flex items-center justify-between px-4 bg-[rgb(22,22,22)] rounded-b-[25px]'>
      <div className='header-left flex items-center'>
        <Avatar className="ml-2" size="lg">
          <AvatarImage src={photoUrl ?? undefined}/>
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
      </div>
      <div className='header-right flex items-center justify-end gap-4'>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          </ThemeProvider>
        <Select defaultValue='ru'>
          <SelectTrigger className="w-[96px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ru" className='cursor-pointer'><p className="flag">🇷🇺</p> RU</SelectItem>
              <SelectItem value="en" className='cursor-pointer'><p className="flag">🇺🇸</p> EN</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}