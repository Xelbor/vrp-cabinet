"use client"

import { DiApple, DiAndroid, DiWindows, DiLinux } from "react-icons/di";

export const bytesToGiB = (value: number): string => {
  if (value === 0) return '∞';
  
  return (value / (1024 ** 3)).toFixed(2);
}

export function definePlatformIcon(platform: string) {
  switch (platform) {
    case 'Linux': return <DiLinux />;
    case 'Windows': return <DiWindows />;
    case 'MacOS': return <DiApple />;
    case 'iOS': return <DiApple />;
    case 'Android': return <DiAndroid />;
    default: return null;
  }
}