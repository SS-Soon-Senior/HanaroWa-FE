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

// 요일 약어와 한글 라벨을 매핑하는 객체
const DAY_LABELS: { [key: string]: string } = {
  'mon-wed': '월, 수',
  'tue-thu': '화, 목',
  'mon-fri': '월-금',
  weekend: '토, 일',
  daily: '매일',
};

/**
 * 입력 문자열에서 시작일을 "YYYY년 M월 D일" 형식으로 변환합니다.
 * @param input - '2025-01-01~2025-02-28 mon-fri 17:00-18:00' 형식의 문자열
 * @returns 포맷팅된 시작일 문자열 (예: '2025년 1월 1일')
 */
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
    console.error('날짜 포맷팅 중 오류 발생:', error);
    return '날짜 형식 오류';
  }
};

/**
 * 입력 문자열에서 강의 시간을 "요일 HH:mm-HH:mm" 형식으로 변환합니다.
 * @param input - '2025-01-01~2025-02-28 mon-fri 17:00-18:00' 형식의 문자열
 * @returns 포맷팅된 강의 시간 문자열 (예: '월, 화, 수, 목, 금 17:00-18:00')
 */
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
    console.error('강의 시간 포맷팅 중 오류 발생:', error);
    return '시간 형식 오류';
  }
};

/**
 * 입력 문자열에서 강의 기간을 주 단위로 계산합니다.
 * @param input - '2025-01-01~2025-02-28 mon-fri 17:00-18:00' 형식의 문자열
 * @returns 계산된 강의 기간 문자열 (예: '8주')
 */
export const calculateDurationInWeeks = (input: string): string => {
  try {
    const dateRange = input.split(' ')[0];
    const [startDateStr, endDateStr] = dateRange.split('~');

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return '기간 계산 불가';
    }

    // 두 날짜 간의 시간 차이를 밀리초 단위로 계산
    const timeDiff = endDate.getTime() - startDate.getTime();

    // 밀리초를 일(day) 단위로 변환
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    // 일을 주(week) 단위로 변환하고, 소수점 첫째 자리에서 반올림
    const durationWeeks = Math.round(dayDiff / 7);

    return `${durationWeeks}주`;
  } catch (error) {
    console.error('강의 기간 계산 중 오류 발생:', error);
    return '기간 계산 오류';
  }
};
