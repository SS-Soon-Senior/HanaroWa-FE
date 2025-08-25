export type CategoryKey =
  | 'digital'
  | 'culture'
  | 'language'
  | 'health'
  | 'trend'
  | 'finance'
  | 'others';

export const CATEGORY_META = {
  digital: { title: '디지털', className: 'bg-[#EEF2FF] text-[#4F46E5]' },
  culture: { title: '문화', className: 'bg-[#FEF3C7] text-[#D97706]' },
  language: { title: '언어', className: 'bg-[#FCE1DC] text-[#D74545]' },
  health: { title: '건강', className: 'bg-[#DCFCE7] text-[#166534]' },
  trend: { title: '트렌드', className: 'bg-[#FFE8FF] text-[#B152B5]' },
  finance: { title: '재무', className: 'bg-main text-white' },
  others: { title: '기타', className: 'bg-[#DAD3DA] text-[#6A6B8E]' },
} as const satisfies Record<CategoryKey, { title: string; className: string }>;
