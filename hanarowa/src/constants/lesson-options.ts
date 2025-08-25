import { Lesson } from '@/types/lesson';

// 드롭다운 옵션들
export const categoryOptions = [
  { value: 'language', label: '어학' },
  { value: 'programming', label: '프로그래밍' },
  { value: 'art', label: '예술' },
  { value: 'music', label: '음악' },
  { value: 'cooking', label: '요리' },
  { value: 'etc', label: '기타' },
];

export const dayOptions = [
  { value: 'mon-wed', label: '월, 수' },
  { value: 'tue-thu', label: '화, 목' },
  { value: 'mon-fri', label: '월, 화, 수, 목, 금' },
  { value: 'weekend', label: '토, 일' },
  { value: 'daily', label: '매일' },
];

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

export const startDateOptions = [
  { value: '2025-08-18', label: '2025-08-18' },
  { value: '2025-08-19', label: '2025-08-19' },
  { value: '2025-08-20', label: '2025-08-20' },
];

export const endDateOptions = [
  { value: '2025-08-30', label: '2025-08-30' },
  { value: '2025-08-31', label: '2025-08-31' },
  { value: '2025-09-01', label: '2025-09-01' },
];

export const MOCK_LESSONS: Record<string, Lesson> = {
  '1': {
    title: '디지털 카메라 기초 완성',
    instructorIntro: '10년 경력 사진가. 기초부터 실전까지 친절 지도.',
    lessonIntro: '노출/초점/구도 기본과 실습 중심 커리큘럼',
    fee: '30,000',
    category: '사진',
    startDate: '2025-08-18',
    endDate: '2025-08-30',
    days: '월, 수',
    time: '11:00 ~ 13:00',
    imageUrl: 'https://via.placeholder.com/480x300?text=Lesson+1',
    lessonDescription: '1차시: 카메라 기본 조작',
    expectedParticipants: '20',
    additionalContents: ['2차시: 노출 삼요소', '3차시: 구도와 실습'],
  },
  '2': {
    title: '스마트폰 사진 마스터',
    instructorIntro: '모바일 사진 전문 강사.',
    lessonIntro: '스마트폰으로도 충분히 예쁜 사진을!',
    fee: '15,000원',
    category: '사진',
    startDate: '2025-09-01',
    endDate: '2025-09-15',
    days: '화, 목',
    time: '10:00 ~ 12:00',
    imageUrl: 'https://via.placeholder.com/480x300?text=Lesson+2',
    lessonDescription: '1차시: 기본 앱과 설정',
    expectedParticipants: '25',
    additionalContents: ['2차시: 인물/음식 사진', '3차시: 야외 실습'],
  },
};
