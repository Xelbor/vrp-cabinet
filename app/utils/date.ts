export const formatDate = (dateString: string): string => {
    if (dateString === null) { return "--" }
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);

    return `${day}.${month}.${year}`;
};

export const getTimeLeft = (endDateString: string): string => {
  if (!endDateString) return "--";

  const now = new Date();
  const endDate = new Date(endDateString);

  const diffMs = endDate.getTime() - now.getTime();

  if (diffMs <= 0) return "Истекло";

  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // Если >= 1 дня — показываем дни
  if (diffDays >= 1) {
    return `${Math.floor(diffDays)} дн.`;
  }

  // Если < 1 дня — считаем часы и минуты
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} ч. ${minutes} мин.`;
  }

  return `${minutes} мин.`;
};