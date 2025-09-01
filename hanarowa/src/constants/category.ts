import { components } from '@/types/api';

export type CategoryKey =
  components['schemas']['CreateLessonRequestDTO']['category'];

export const CATEGORY_META = {
  DIGITAL: { title: '디지털/IT', className: 'bg-[#EEF2FF] text-[#4F46E5]' },
  CULTURE: { title: '문화/예술', className: 'bg-[#FEF3C7] text-[#D97706]' },
  LANGUAGE: { title: '어학/인문', className: 'bg-[#FCE1DC] text-[#D74545]' },
  HEALTH: { title: '건강', className: 'bg-[#DCFCE7] text-[#166534]' },
  TREND: { title: '트렌드', className: 'bg-[#FFE8FF] text-[#B152B5]' },
  FINANCE: { title: '금융', className: 'bg-main text-white' },
  OTHERS: { title: '기타', className: 'bg-[#DAD3DA] text-[#6A6B8E]' },
} as const satisfies Record<CategoryKey, { title: string; className: string }>;

export const CATEGORY_KEYS = Object.keys(CATEGORY_META) as CategoryKey[];
