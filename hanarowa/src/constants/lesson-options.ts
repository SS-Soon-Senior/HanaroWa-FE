// 드롭다운 옵션들
export const categoryOptions = [
  { value: 'digital', label: '디지털/IT' },
  { value: 'culture', label: '문화/예술' },
  { value: 'language', label: '어학/인문' },
  { value: 'health', label: '건강' },
  { value: 'trend', label: '트렌드' },
  { value: 'others', label: '기타' },
  { value: 'finance', label: '금융' },
];

export const dayOptions = [
  { value: 'mon-wed', label: '월, 수' },
  { value: 'tue-thu', label: '화, 목' },
  { value: 'mon-fri', label: '월, 화, 수, 목, 금' },
  { value: 'weekend', label: '토, 일' },
  { value: 'daily', label: '매일' },
];

// MultiDaySelector에서 사용할 개별 요일 옵션들
export const individualDayOptions = [
  { value: 'mon', label: '월', fullName: '월요일' },
  { value: 'tue', label: '화', fullName: '화요일' },
  { value: 'wed', label: '수', fullName: '수요일' },
  { value: 'thu', label: '목', fullName: '목요일' },
  { value: 'fri', label: '금', fullName: '금요일' },
  { value: 'sat', label: '토', fullName: '토요일' },
  { value: 'sun', label: '일', fullName: '일요일' },
];

// 선택된 요일들을 기존 시스템 value로 매핑
export const daySelectionMapping: Record<string, string> = {
  'mon,wed': 'mon-wed',
  'tue,thu': 'tue-thu',
  'mon,tue,wed,thu,fri': 'mon-fri',
  'sat,sun': 'weekend',
  'mon,tue,wed,thu,fri,sat,sun': 'daily',
};

export const timeOptions = [
  { value: '09:00-10:00', label: '09:00 ~ 10:00' },
  { value: '10:00-11:00', label: '10:00 ~ 11:00' },
  { value: '11:00-12:00', label: '11:00 ~ 12:00' },
  { value: '11:00-13:00', label: '11:00 ~ 13:00' },
  { value: '13:00-14:00', label: '13:00 ~ 14:00' },
  { value: '14:00-15:00', label: '14:00 ~ 15:00' },
  { value: '15:00-16:00', label: '15:00 ~ 16:00' },
  { value: '16:00-17:00', label: '16:00 ~ 17:00' },
  { value: '17:00-18:00', label: '17:00 ~ 18:00' },
  { value: '18:00-19:00', label: '18:00 ~ 19:00' },
  { value: '19:00-20:00', label: '19:00 ~ 20:00' },
];
