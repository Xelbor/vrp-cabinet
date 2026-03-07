"use client"

import { DiApple, DiAndroid, DiWindows, DiLinux } from "react-icons/di";

export const bytesToGiB = (value: number): string => {
  if (value === 0) return '∞';
  
  return (value / (1024 ** 3)).toFixed(2);
}

export function formatValue(value: string | number, type: 'devices' | 'traffic' | 'days'): string {
  const num = Number(value);

  if (num === 0) return '∞';

  if (type === 'devices') {
    const cases = ['устройство', 'устройства', 'устройств'];
    const mod10 = num % 10;
    const mod100 = num % 100;
    
    if (mod10 === 1 && mod100 !== 11) return `${num} ${cases[0]}`;
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${num} ${cases[1]}`;
    return `${num} ${cases[2]}`;
  }

  return num.toString();
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