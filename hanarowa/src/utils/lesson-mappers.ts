import {
  daySelectionMapping,
  individualDayOptions,
  categoryOptions,
} from '@/constants/lesson-options';

/**
 * Maps selected individual days to system day value
 */
export function mapSelectedDaysToValue(selectedDays: string[]): string {
  const sortedDays = selectedDays.sort();
  const key = sortedDays.join(',');
  return daySelectionMapping[key] || selectedDays.join(',');
}

/**
 * Maps system day value to individual day selections
 */
export function mapValueToSelectedDays(value: string): string[] {
  // Find the key that maps to this value
  const entry = Object.entries(daySelectionMapping).find(
    ([_, v]) => v === value
  );
  if (entry) {
    return entry[0].split(',');
  }
  // If not found in mapping, assume it's already individual days
  return value.split(',');
}

/**
 * Gets display label for selected days
 */
export function getDaysDisplayLabel(selectedDays: string[]): string {
  return selectedDays
    .map(
      (day) =>
        individualDayOptions.find((option) => option.value === day)?.label
    )
    .filter(Boolean)
    .join(', ');
}

/**
 * Gets category label from value
 */
export function getCategoryLabel(value: string): string {
  return (
    categoryOptions.find((option) => option.value === value)?.label || value
  );
}

/**
 * Calculates lesson duration in weeks
 */
export function calculateLessonDuration(
  startDate: string,
  endDate: string
): string {
  if (!startDate || !endDate) return '';

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));

  return `${diffWeeks}주`;
}

/**
 * Validates lesson form data
 */
export function validateLessonData(data: {
  title?: string;
  instructorName?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  days?: string;
  time?: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title?.trim()) errors.push('강좌명을 입력해주세요.');
  if (!data.instructorName?.trim()) errors.push('강사명을 입력해주세요.');
  if (!data.category) errors.push('카테고리를 선택해주세요.');
  if (!data.startDate) errors.push('시작일을 선택해주세요.');
  if (!data.endDate) errors.push('종료일을 선택해주세요.');
  if (!data.days) errors.push('요일을 선택해주세요.');
  if (!data.time) errors.push('시간을 선택해주세요.');

  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (start >= end) {
      errors.push('종료일은 시작일보다 늦어야 합니다.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}