import { useState, useRef, useCallback } from 'react';
import { usePostLesson, useCheckAvailability } from '@/apis';
import { components } from '@/types/api';
import { LessonFormData } from '@/types/lesson';
import { timeOptions } from '@/constants';

export type CreateLessonRequest = components['schemas']['CreateLessonRequestDTO'];

export interface LessonFormConfig {
  isAdmin: boolean;
  initialData?: Partial<LessonFormData>;
  onSuccess?: () => void;
  branchId?: string;
  instructorName?: string;
}

export const useLessonForm = (config: LessonFormConfig) => {
  const { isAdmin, initialData, onSuccess, branchId, instructorName } = config;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string>('');
  const [disabledTimeSlots, setDisabledTimeSlots] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    instructorName: '',
    instructorIntro: '',
    lessonIntro: '',
    fee: '',
    category: '',
    branchId: '',
    startDate: '',
    endDate: '',
    days: '',
    time: '',
    lessonImage: null,
    lessonDescription: '',
    expectedParticipants: '20',
    additionalContents: [],
    ...initialData,
  });

  const { mutate: createLesson, isPending } = usePostLesson();
  const { mutate: checkAvailability, isPending: isCheckingAvailability } = useCheckAvailability();

  const handleInputChange = useCallback(
    (field: keyof LessonFormData, value: string | boolean | File | null | string[]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleAddContent = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      additionalContents: [...prev.additionalContents, ''],
    }));
  }, []);

  const handleAdditionalContentChange = useCallback((index: number, value: string) => {
    const newContents = [...formData.additionalContents];
    newContents[index] = value;
    handleInputChange('additionalContents', newContents);
  }, [formData.additionalContents, handleInputChange]);

  const removeAdditionalContent = useCallback((index: number) => {
    const newContents = formData.additionalContents.filter((_, i) => i !== index);
    handleInputChange('additionalContents', newContents);
  }, [formData.additionalContents, handleInputChange]);

  const handleRemoveImage = useCallback(() => {
    handleInputChange('lessonImage', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleInputChange]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const maxSize = 512 * 1024; // 512KB

      if (file.size > maxSize) {
        setImageError('이미지 크기 512KB이하로 선택해주세요.');
        target.value = '';
        return;
      }

      setImageError('');
      handleInputChange('lessonImage', file);
    }
  }, [handleInputChange]);

  const checkTimeAvailability = useCallback(async () => {
    const currentBranchId = isAdmin ? formData.branchId : branchId;
    
    if (
      formData.startDate &&
      formData.endDate &&
      formData.days &&
      currentBranchId
    ) {
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
              branchId: parseInt(currentBranchId),
              duration: durationWithoutTime,
            },
            {
              onSuccess: resolve,
              onError: reject,
            }
          );
        });

        if (result?.result?.timeSlots && result.result.timeSlots.length > 1) {
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
              const endTime = new Date(slot.endTime).toLocaleTimeString(
                'ko-KR',
                {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }
              );
              return `${startTime}-${endTime}`;
            });

          setDisabledTimeSlots(unavailableSlots);
          return;
        }
      } catch (error) {
        console.error('시간대 확인 중 오류 발생:', error);
      }

      const unavailableSlots: string[] = [];

      for (const timeOption of timeOptions) {
        const duration = `${formData.startDate}~${formData.endDate} ${formData.days} ${timeOption.value}`;

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
                branchId: parseInt(currentBranchId),
                duration,
              },
              {
                onSuccess: resolve,
                onError: reject,
              }
            );
          });

          if (
            !result?.result?.available ||
            result?.result?.availableRoomsCount === 0
          ) {
            unavailableSlots.push(timeOption.value);
          }
        } catch (error) {
          console.error('시간대 확인 중 오류 발생:', error);
          unavailableSlots.push(timeOption.value);
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setDisabledTimeSlots(unavailableSlots);
    }
  }, [formData.startDate, formData.endDate, formData.days, formData.branchId, branchId, isAdmin, checkAvailability]);

  const handleSubmit = useCallback(() => {
    const currentBranchId = isAdmin ? formData.branchId : branchId;
    const currentInstructorName = isAdmin ? formData.instructorName : instructorName;
    
    if (!currentBranchId) {
      alert(isAdmin ? '지점을 선택해주세요.' : '지점 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
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
    const capacity = parseInt(formData.expectedParticipants || '0', 10) || 20;
    const lessonFee = parseInt(formData.fee || '0', 10) || 0;
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

    fd.delete('lessonGisus');
    fd.delete('lessonGisus[0]');

    createLesson(fd, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        console.error('강좌 개설 실패:', error);
      },
    });
  }, [formData, createLesson, onSuccess, isAdmin, branchId, instructorName]);

  return {
    formData,
    fileInputRef,
    imageError,
    disabledTimeSlots,
    isPending,
    isCheckingAvailability,
    handleInputChange,
    handleAddContent,
    handleAdditionalContentChange,
    removeAdditionalContent,
    handleRemoveImage,
    handleImageUpload,
    checkTimeAvailability,
    handleSubmit,
  };
};
