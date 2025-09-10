'use client';

import { usePostLesson, useCheckAvailability } from '@/apis';
import { timeOptions } from '@/constants/lesson-options';
import type { components } from '@/types/api';
import { validateLessonData } from '@/utils/lesson-mappers';
import { useState, useCallback } from 'react';
import { useBaseLessonForm, type BaseLessonConfig } from './useBaseLesson';

export type CreateLessonRequest = components['schemas']['CreateLessonRequestDTO'];

export interface LessonFormConfig extends BaseLessonConfig {
  isAdmin: boolean;
  branchId?: string;
  instructorName?: string;
}

export const useLessonForm = (config: LessonFormConfig) => {
  const { isAdmin, branchId, instructorName, ...baseConfig } = config;
  const [disabledTimeSlots, setDisabledTimeSlots] = useState<string[]>([]);

  const baseForm = useBaseLessonForm(baseConfig);
  const { formData, validateForm, onSuccess } = baseForm;

  const { mutate: createLesson, isPending } = usePostLesson();
  const { mutate: checkAvailability, isPending: isCheckingAvailability } =
    useCheckAvailability();


  const checkTimeAvailability = useCallback(async () => {
    const currentBranchId = isAdmin ? formData.branchId : branchId;

    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.days ||
      !currentBranchId
    ) {
      return;
    }

    const durationWithoutTime = `${formData.startDate}~${formData.endDate} ${formData.days}`;

    try {
      const result = await new Promise<{
        isSuccess: boolean;
        code: string;
        message: string;
        result: {
          available: boolean;
          availableRoomsCount: number;
          timeSlots: Array<{
            startTime: string;
            endTime: string;
            available: boolean;
            availableRoomsCount: number;
          }>;
        };
      }>((resolve, reject) => {
        checkAvailability(
          {
            branchId: Number.parseInt(currentBranchId),
            duration: durationWithoutTime,
          },
          {
            onSuccess: resolve,
            onError: reject,
          }
        );
      });

      if (result?.result?.timeSlots && result.result.timeSlots.length > 0) {
        const unavailableSlots = result.result.timeSlots
          .filter((slot) => !slot.available || slot.availableRoomsCount === 0)
          .map((slot) => {
            const startTime = new Date(slot.startTime).toLocaleTimeString(
              'ko-KR',
              {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }
            );
            const endTime = new Date(slot.endTime).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
            return `${startTime}-${endTime}`;
          });

        setDisabledTimeSlots(unavailableSlots);
        return;
      }
    } catch (error) {
      console.error('시간대 확인 중 오류 발생:', error);
    }
  }, [
    formData.startDate,
    formData.endDate,
    formData.days,
    formData.branchId,
    branchId,
    isAdmin,
    checkAvailability,
  ]);

  const handleSubmit = useCallback(() => {
    const currentInstructorName = isAdmin
      ? formData.instructorName
      : instructorName;

    // Create validation data with current instructor name
    const validationData = {
      ...formData,
      instructorName: currentInstructorName || formData.instructorName,
    };

    const validation = validateLessonData(validationData);
    if (!validation.isValid) {
      // Show first error message
      alert(validation.errors[0]);
      return;
    }

    const currentBranchId = isAdmin ? formData.branchId : branchId;

    if (!currentBranchId) {
      alert(
        isAdmin
          ? '지점을 선택해주세요.'
          : '지점 정보를 찾을 수 없습니다. 다시 로그인해주세요.'
      );
      return;
    }
    if (isAdmin && !currentInstructorName?.trim()) {
      alert('강사 이름을 입력해주세요.');
      return;
    }

    const categoryMap: Record<string, CreateLessonRequest['category']> = {
      digital: 'DIGITAL',
      language: 'LANGUAGE',
      trend: 'TREND',
      others: 'OTHERS',
      finance: 'FINANCE',
      health: 'HEALTH',
      culture: 'CULTURE',
    };

    const fd = new FormData();

    fd.append('lessonName', formData.title);
    fd.append('instructor', currentInstructorName || '');
    fd.append('instruction', formData.instructorIntro);
    fd.append('description', formData.lessonIntro);
    fd.append('category', categoryMap[formData.category]);
    fd.append('branchId', String(currentBranchId));

    const i = 0;
    const capacity =
      Number.parseInt(formData.expectedParticipants || '0', 10) || 20;
    const lessonFee = Number.parseInt(formData.fee || '0', 10) || 0;
    const duration = `${formData.startDate}~${formData.endDate} ${formData.days} ${formData.time}`;
    const lessonRoomId = 1;

    fd.append(`lessonGisus[${i}].capacity`, String(capacity));
    fd.append(`lessonGisus[${i}].lessonFee`, String(lessonFee));
    fd.append(`lessonGisus[${i}].duration`, duration);
    fd.append(`lessonGisus[${i}].lessonRoomId`, String(lessonRoomId));

    if (isAdmin) {
      fd.append(`lessonGisus[${i}].state`, 'APPROVED');
    }

    const curriculums = [
      { content: formData.lessonDescription },
      ...formData.additionalContents
        .filter((c) => c.trim() !== '')
        .map((c) => ({ content: c })),
    ];

    curriculums.forEach((c, j) => {
      fd.append(`lessonGisus[${i}].curriculums[${j}].content`, c.content);
    });

    if (formData.lessonImage) {
      fd.append('lessonImg', formData.lessonImage, formData.lessonImage.name);
    }

    createLesson(fd, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        console.error('강좌 개설 실패:', error);
      },
    });
  }, [
    formData,
    createLesson,
    onSuccess,
    isAdmin,
    branchId,
    instructorName,
    validateForm,
  ]);

  return {
    ...baseForm,
    disabledTimeSlots,
    isPending,
    isCheckingAvailability,
    checkTimeAvailability,
    handleSubmit,
  };
};
