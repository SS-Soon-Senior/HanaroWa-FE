'use client';

import { MOCK_LESSONS } from '@/constants/lesson-options';
import { Lesson, LessonFormData, LessonUpdatePayload } from '@/types/lesson';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
