export function formatValue(value: string | number, type: 'devices' | 'traffic' | 'days'): string {
  const num = Number(value);

  // Логика бесконечности
  if (num === 0) return '∞';

  // Логика склонения
  if (type === 'devices') {
    const cases = ['устройство', 'устройства', 'устройств'];
    const mod10 = num % 10;
    const mod100 = num % 100;
    
    if (mod10 === 1 && mod100 !== 11) return `${num} ${cases[0]}`;
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return `${num} ${cases[1]}`;
    return `${num} ${cases[2]}`;
  }

  // Можно добавить другие типы, например для GB или дней
  return num.toString();
}