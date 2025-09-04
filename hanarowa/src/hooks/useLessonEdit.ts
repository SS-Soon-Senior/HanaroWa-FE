'use client';

import { components } from '@/types/api';
import { Lesson, LessonFormData, LessonUpdatePayload } from '@/types/lesson';
import { updateLesson, getLessonDetail } from '@apis';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';

type LessonDetailResponseDTO = components['schemas']['LessonDetailResponseDTO'];
type UpdateLessonDetailRequestDTO =
  components['schemas']['UpdateLessonDetailRequestDTO'];

// API 카테고리를 한글 라벨로 매핑
const categoryMapping: Record<string, string> = {
  DIGITAL: '디지털/IT',
  CULTURE: '문화/예술',
  LANGUAGE: '어학/인문',
  HEALTH: '건강',
  TREND: '트렌드',
  OTHERS: '기타',
  FINANCE: '금융',
};

// 요일 매핑
const dayMapping: Record<string, string> = {
  'mon-fri': '월, 화, 수, 목, 금',
  'mon-wed': '월, 수',
  'tue-thu': '화, 목',
  weekend: '토, 일',
  daily: '매일',
};

// duration 문자열 파싱 함수
// 예: "2025-09-02 ~ 2025-09-29 mon-fri 17:00-18:00"
function parseDuration(duration: string) {
  const result = {
    startDate: '',
    endDate: '',
    days: '',
    time: '',
  };

  if (!duration) return result;

  // 날짜 범위 파싱 (YYYY-MM-DD ~ YYYY-MM-DD)
  const dateMatch = duration.match(/(\d{4}-\d{2}-\d{2})~(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    result.startDate = dateMatch[1];
    result.endDate = dateMatch[2];
  }

  // 요일 파싱 (mon-fri, tue-thu 등)
  const dayMatch = duration.match(
    /\b(mon-fri|tue-thu|mon-wed|weekend|daily)\b/
  );
  if (dayMatch) {
    result.days = dayMapping[dayMatch[1]] || dayMatch[1];
  }

  // 시간 파싱 (17:00-18:00)
  const timeMatch = duration.match(/(\d{2}:\d{2})-(\d{2}:\d{2})/);
  if (timeMatch) {
    result.time = `${timeMatch[1]}~${timeMatch[2]}`;
  }

  return result;
}

// LessonDetailResponseDTO를 Lesson 타입으로 변환하는 함수
function convertToLesson(dto: LessonDetailResponseDTO): Lesson | null {
  if (!dto) return null;

  // 첫 번째 기수의 정보를 사용
  const firstGisu = dto.lessonGisus?.[0];
  if (!firstGisu) return null;

  // duration 파싱
  const parsedDuration = parseDuration(firstGisu.duration || '');

  return {
    title: dto.lessonName || '',
    instructorIntro: dto.instructor || '',
    lessonIntro: dto.instruction || '',
    fee: firstGisu.lessonFee?.toString() || '',
    category: categoryMapping[dto.category || ''] || dto.category || '',
    startDate: parsedDuration.startDate,
    endDate: parsedDuration.endDate,
    days: parsedDuration.days,
    time: parsedDuration.time,
    imageUrl: dto.lessonImg,
    lessonDescription: dto.description || '',
    expectedParticipants: firstGisu.capacity?.toString() || '',
    additionalContents:
      firstGisu.curriculums?.map((c) => c.content || '') || [],
    status:
      firstGisu.lessonState === 'APPROVED'
        ? '승인'
        : firstGisu.lessonState === 'REJECTED'
          ? '반려'
          : '대기중',
  };
}

export function useLessonEdit(id: string | undefined) {
  const [initial, setInitial] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    instructorIntro: '',
    lessonIntro: '',
    fee: '',
    category: '',
    startDate: '',
    endDate: '',
    days: '',
    time: '',
    lessonImage: null,
    lessonDescription: '',
    expectedParticipants: '',
    additionalContents: [],
  });

  // MOCK 주입 (API 연결 시 여기만 바꾸면 됨)
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const data = MOCK_LESSONS[String(id)] ?? null;
    setInitial(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (!initial) return;
    setFormData((prev) => ({
      ...prev,
      additionalContents: Array(initial.additionalContents?.length ?? 0).fill(
        ''
      ),
    }));
  }, [initial]);

  const handleInputChange = useCallback(
    <K extends keyof LessonFormData>(field: K, value: LessonFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAddContent = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      additionalContents: [...prev.additionalContents, ''],
    }));
  }, []);

  const handleAdditionalContentChange = useCallback(
    (index: number, value: string) => {
      setFormData((prev) => {
        const next = [...prev.additionalContents];
        next[index] = value;
        return { ...prev, additionalContents: next };
      });
    },
    []
  );

  const removeAdditionalContent = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalContents: prev.additionalContents.filter((_, i) => i !== index),
    }));
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const removeImage = useCallback(() => {
    handleInputChange('lessonImage', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [handleInputChange]);

  const additionalCount = useMemo(
    () =>
      Math.max(
        formData.additionalContents.length,
        initial?.additionalContents?.length ?? 0
      ),
    [formData.additionalContents.length, initial?.additionalContents?.length]
  );

  const isDirty = useMemo(() => {
    const {
      title,
      instructorIntro,
      lessonIntro,
      fee,
      category,
      startDate,
      endDate,
      days,
      time,
      lessonDescription,
      expectedParticipants,
      additionalContents,
      lessonImage,
    } = formData;

    const anyText = [
      title,
      instructorIntro,
      lessonIntro,
      fee,
      category,
      startDate,
      endDate,
      days,
      time,
      lessonDescription,
      expectedParticipants,
    ].some((v) => (v ?? '').toString().trim() !== '');
    const anyAdds =
      (additionalContents?.length ?? 0) > 0 &&
      additionalContents.some((v) => (v ?? '').toString().trim() !== '');
    const img = !!lessonImage;

    return anyText || anyAdds || img;
  }, [formData]);

  const buildPayload = useCallback((): LessonUpdatePayload => {
    if (!initial) {
      return {
        title: formData.title,
        instructorIntro: formData.instructorIntro,
        lessonIntro: formData.lessonIntro,
        fee: formData.fee,
        category: formData.category,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: formData.days,
        time: formData.time,
        lessonDescription: formData.lessonDescription,
        expectedParticipants: formData.expectedParticipants,
        additionalContents: formData.additionalContents.filter(
          (v) => v?.trim() !== ''
        ),
      };
    }

    const base = initial.additionalContents ?? [];
    const edits = formData.additionalContents ?? [];

    const mergedExisting = base.map((orig, idx) => {
      const v = edits[idx];
      return v && v.trim() !== '' ? v : orig;
    });
    const extras = edits.slice(base.length).filter((v) => v && v.trim() !== '');

    return {
      title: formData.title.trim() || initial.title,
      instructorIntro:
        formData.instructorIntro.trim() || initial.instructorIntro,
      lessonIntro: formData.lessonIntro.trim() || initial.lessonIntro,
      fee: formData.fee.trim() || initial.fee,
      category: formData.category.trim() || initial.category,
      startDate: formData.startDate.trim() || initial.startDate,
      endDate: formData.endDate.trim() || initial.endDate,
      days: formData.days.trim() || initial.days,
      time: formData.time.trim() || initial.time,
      lessonDescription:
        formData.lessonDescription.trim() || initial.lessonDescription,
      expectedParticipants:
        formData.expectedParticipants.trim() || initial.expectedParticipants,
      additionalContents: [...mergedExisting, ...extras],
    };
  }, [formData, initial]);

  return {
    initial,
    loading,
    formData,
    fileInputRef,

    isDirty,
    additionalCount,

    handleInputChange,
    handleAddContent,
    handleAdditionalContentChange,
    removeAdditionalContent,
    removeImage,
    buildPayload,
  };
}
