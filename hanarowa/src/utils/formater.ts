export const formatDuration = (duration: string) => {
  if (!duration || !duration.includes('~')) {
    return duration;
  }

  const [startDate] = duration.split('~');
  const date = new Date(startDate);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month.toString().padStart(2, '0')}월 ${day}일`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};
