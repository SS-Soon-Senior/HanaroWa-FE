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

const DAY_LABELS: { [key: string]: string } = {
  'mon-wed': '월, 수',
  'tue-thu': '화, 목',
  'mon-fri': '월-금',
  weekend: '토, 일',
  daily: '매일',
};

export const formatStartDate = (input: string): string => {
  try {
    const startDateStr = input.split('~')[0];
    const startDate = new Date(startDateStr);

    // 유효하지 않은 날짜일 경우 에러 처리
    if (isNaN(startDate.getTime())) {
      return '유효하지 않은 날짜';
    }

    return `${startDate.getFullYear()}년 ${startDate.getMonth() + 1}월 ${startDate.getDate()}일`;
  } catch (error) {
    console.warn('날짜 포맷팅 중 오류 발생:', error);
    return '날짜 형식 오류';
  }
};

export const formatLessonTime = (input: string): string => {
  try {
    const parts = input.split(' ');
    if (parts.length < 3) {
      return '유효하지 않은 형식';
    }
    const daysValue = parts[1];
    const timeRange = parts[2];

    const formattedDays = DAY_LABELS[daysValue] || daysValue;
    return `${formattedDays} ${timeRange}`;
  } catch (error) {
    console.warn('강의 시간 포맷팅 중 오류 발생:', error);
    return '시간 형식 오류';
  }
};

export const calculateDurationInWeeks = (input: string): string => {
  try {
    const dateRange = input.split(' ')[0];
    const [startDateStr, endDateStr] = dateRange.split('~');

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return '기간 계산 불가';
    }

    const timeDiff = endDate.getTime() - startDate.getTime();

    const dayDiff = timeDiff / (1000 * 3600 * 24);

    const durationWeeks = Math.round(dayDiff / 7);

    return `${durationWeeks}주`;
  } catch (error) {
    console.warn('강의 기간 계산 중 오류 발생:', error);
    return '기간 계산 오류';
  }
};

export const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
};

export const formatDateToISO = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 8) return '';
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
};

export const formatDateFromISO = (isoDate: string) => {
  return isoDate.replace(/\D/g, '');
};
