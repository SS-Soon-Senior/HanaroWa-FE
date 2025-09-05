'use client';

import { components } from '@/types/api';
import { Lesson, LessonFormData } from '@/types/lesson';
import { getLessonGisuDetail, updateLessonGisu } from '@apis';
import { useCallback, useEffect, useMemo, useState } from 'react';

type LessonGisuDetailResponseDTO = components['schemas']['LessonGisuDetailResponseDTO'];
type UpdateLessonGisuRequestDTO =
  components['schemas']['UpdateLessonGisuRequestDTO'];

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
  const dateMatch = duration.match(
    /(\d{4}-\d{2}-\d{2})\s*~\s*(\d{4}-\d{2}-\d{2})/
  );
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
    result.time = `${timeMatch[1]} ~ ${timeMatch[2]}`;
  }

  return result;
}

// LessonDetailResponseDTO를 Lesson 타입으로 변환하는 함수
function convertToLesson(dto: LessonGisuDetailResponseDTO): Lesson | null {
  if (!dto) return null;

  // duration 파싱
  const parsedDuration = parseDuration(dto.duration || '');

  return {
    title: dto.lessonName || '',
    instructorName: dto.instructor || '',
    instructorIntro: dto.instruction || '',
    lessonIntro: dto.description || '',
    fee: dto.lessonFee?.toString() || '',
    category: categoryMapping[dto.category || ''] || dto.category || '',
    startDate: parsedDuration.startDate,
    endDate: parsedDuration.endDate,
    days: parsedDuration.days,
    time: parsedDuration.time,
    imageUrl: dto.lessonImg,
    lessonDescription: dto.curriculums?.[0]?.content || '',
    expectedParticipants: dto.capacity?.toString() || '',
    additionalContents:
      dto.curriculums?.slice(1).map((c) => c.content || '') || [],
    status:
      dto.lessonState === 'APPROVED'
        ? '승인'
        : dto.lessonState === 'REJECTED'
          ? '반려'
          : '대기중',
  };
}

export function useLessonEdit(id: string | undefined) {
  const [initial, setInitial] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    instructorName: '',
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

  // 실제 API 호출
  useEffect(() => {
    if (!id) return;

    const fetchLessonGisuDetail = async () => {
      try {
        console.log('📍 URL에서 받은 id:', id);
        console.log('📍 lessonGisuId로 API 호출:', Number(id));
        setLoading(true);
        const response = await getLessonGisuDetail(Number(id));
        console.log('📍 API 응답 데이터:', response.result);
        const lessonData = response.result
          ? convertToLesson(response.result)
          : null;
        setInitial(lessonData);
      } catch (error) {
        console.error('강좌 기수 상세 정보 가져오기 실패:', error);
        setInitial(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonGisuDetail();
  }, [id]);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!initial || isInitialized) return;

    setFormData({
      title: initial.title || '',
      instructorName: initial.instructorName || '',
      instructorIntro: initial.instructorIntro || '',
      lessonIntro: initial.lessonIntro || '',
      fee: initial.fee || '',
      category: initial.category || '',
      startDate: initial.startDate || '',
      endDate: initial.endDate || '',
      days: initial.days || '',
      time: initial.time || '',
      lessonImage: null,
      lessonDescription: initial.lessonDescription || '',
      expectedParticipants: initial.expectedParticipants || '',
      additionalContents: initial.additionalContents || [],
    });
    setIsInitialized(true);
  }, [initial, isInitialized]);

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

  const additionalCount = useMemo(
    () =>
      Math.max(
        formData.additionalContents.length,
        initial?.additionalContents?.length ?? 0
      ),
    [formData.additionalContents.length, initial?.additionalContents?.length]
  );

  const isDirty = useMemo(() => {
    if (!initial) return false;

    const {
      title,
      instructorName,
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

    // 각 필드가 초기값과 다른지 체크
    const isChanged = [
      title !== (initial.title || ''),
      instructorName !== (initial.instructorName || ''),
      instructorIntro !== (initial.instructorIntro || ''),
      lessonIntro !== (initial.lessonIntro || ''),
      fee !== (initial.fee || ''),
      category !== (initial.category || ''),
      startDate !== (initial.startDate || ''),
      endDate !== (initial.endDate || ''),
      days !== (initial.days || ''),
      time !== (initial.time || ''),
      lessonDescription !== (initial.lessonDescription || ''),
      expectedParticipants !== (initial.expectedParticipants || ''),
    ].some(Boolean);

    // additionalContents 배열이 변경되었는지 체크
    const additionalChanged = 
      additionalContents.length !== (initial.additionalContents?.length ?? 0) ||
      additionalContents.some((content, index) => 
        content !== (initial.additionalContents?.[index] || '')
      );

    // 이미지가 새로 선택되었는지 체크
    const imageChanged = !!lessonImage;

    return isChanged || additionalChanged || imageChanged;
  }, [formData, initial]);

  const buildPayload = useCallback(
    (originalData: LessonGisuDetailResponseDTO): UpdateLessonGisuRequestDTO => {
      // API 스키마에 맞게 데이터 변환
      const getCategoryKey = (categoryLabel: string) => {
        const mapping: Record<string, string> = {
          '디지털/IT': 'DIGITAL',
          '문화/예술': 'CULTURE',
          '어학/인문': 'LANGUAGE',
          건강: 'HEALTH',
          트렌드: 'TREND',
          기타: 'OTHERS',
          금융: 'FINANCE',
        };
        return mapping[categoryLabel] || categoryLabel || 'OTHERS';
      };

      const getDayKey = (dayLabel: string) => {
        const mapping: Record<string, string> = {
          '월, 화, 수, 목, 금': 'mon-fri',
          '월, 수': 'mon-wed',
          '화, 목': 'tue-thu',
          '토, 일': 'weekend',
          매일: 'daily',
        };
        return mapping[dayLabel] || 'mon-fri';
      };

      const formatDuration = (
        startDate: string,
        endDate: string,
        days: string,
        time: string
      ) => {
        if (!startDate || !endDate || !days || !time) return '';
        const dayKey = getDayKey(days);
        // 시간 형식 통일: ' ~ ' 또는 '-' 둘 다 '-'로 변환
        const timeFormatted = time.replace(' ~ ', '-').replace(/\s+/g, '');
        return `${startDate} ~ ${endDate} ${dayKey} ${timeFormatted}`;
      };

      // 기존 데이터와 수정된 데이터 병합
      const base = initial?.additionalContents ?? [];
      const edits = formData.additionalContents ?? [];

      const mergedExisting = base.map((orig, idx) => {
        const v = edits[idx];
        return v && v.trim() !== '' ? v : orig;
      });
      const extras = edits
        .slice(base.length)
        .filter((v) => v && v.trim() !== '');
      const allContents = [...mergedExisting, ...extras];

      // 원본 기수 데이터의 커리큘럼 정보 사용
      const originalCurriculums = originalData.curriculums ?? [];

      // 첫 번째 커리큘럼은 lessonDescription, 나머지는 additionalContents
      const firstContent = formData.lessonDescription.trim() || initial?.lessonDescription || originalCurriculums[0]?.content || '';
      const additionalContent = allContents.filter(content => content.trim() !== '');
      const allCurriculumContent = [firstContent, ...additionalContent];

      return {
        lessonName:
          formData.title.trim() ||
          initial?.title ||
          originalData.lessonName ||
          '',
        instructor:
          formData.instructorName.trim() ||
          initial?.instructorName ||
          originalData.instructor ||
          '',
        instruction:
          formData.instructorIntro.trim() ||
          initial?.instructorIntro ||
          originalData.instruction ||
          '',
        description:
          formData.lessonIntro.trim() ||
          initial?.lessonIntro ||
          originalData.description ||
          '',
        category: (formData.category.trim()
          ? getCategoryKey(formData.category.trim())
          : initial?.category
            ? getCategoryKey(initial.category)
            : originalData.category) as
          | 'DIGITAL'
          | 'LANGUAGE'
          | 'TREND'
          | 'OTHERS'
          | 'FINANCE'
          | 'HEALTH'
          | 'CULTURE',
        lessonImg: originalData.lessonImg,
        capacity:
          parseInt(
            formData.expectedParticipants.trim() ||
              initial?.expectedParticipants ||
              originalData.capacity?.toString() ||
              '0'
          ) || 0,
        lessonFee:
          parseInt(
            formData.fee.trim() ||
              initial?.fee ||
              originalData.lessonFee?.toString() ||
              '0'
          ) || 0,
        duration: (() => {
          const newStartDate =
            formData.startDate.trim() || initial?.startDate || '';
          const newEndDate =
            formData.endDate.trim() || initial?.endDate || '';
          const newDays = formData.days.trim() || initial?.days || '';
          const newTime = formData.time.trim() || initial?.time || '';

          const formattedDuration = formatDuration(
            newStartDate,
            newEndDate,
            newDays,
            newTime
          );

          // duration이 비어있으면 기존 값을 사용하거나 기본값을 설정
          const finalDuration =
            formattedDuration ||
            originalData.duration ||
            '2025-01-01 ~ 2025-01-31 mon-fri 09:00-10:00';
          return finalDuration;
        })(),
        lessonState: originalData.lessonState || 'PENDING',
        curriculums: allCurriculumContent.map((content, index) => ({
          id: originalCurriculums[index]?.id ?? -1, // 새로 추가되는 것은 -1로
          content,
        })),
      };
    },
    [formData, initial]
  );

  const updateLessonData = useCallback(async () => {
    if (!id || !initial) return;

    try {
      console.log('🔄 업데이트 시작 - lessonGisuId:', id);
      setLoading(true);
      const response = await getLessonGisuDetail(Number(id));
      const originalData = response.result;
      if (!originalData) throw new Error('원본 데이터를 불러올 수 없습니다');

      const payload = buildPayload(originalData);
      console.log('🔄 업데이트 payload:', payload);
      console.log('🔄 updateLessonGisu 호출 - lessonGisuId:', Number(id).toString());
      await updateLessonGisu(Number(id).toString(), payload);
      console.log('✅ 업데이트 성공');
      return true; // 성공 시 true 반환
    } catch (error) {
      console.error('강좌 기수 수정 실패:', error);
      return false; // 실패 시 false 반환
    } finally {
      setLoading(false);
    }
  }, [id, initial, buildPayload]);

  return {
    initial,
    loading,
    formData,
    isDirty,
    additionalCount,
    handleInputChange,
    handleAddContent,
    handleAdditionalContentChange,
    removeAdditionalContent,
    buildPayload,
    updateLessonData,
  };
}
