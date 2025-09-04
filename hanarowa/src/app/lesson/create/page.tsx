'use client';

import { usePostLesson, useCheckAvailability } from '@/apis/lesson';
import { IcImageUpload, IcUsers } from '@/assets/svg';
import {
  Layout,
  Header,
  Input,
  Textarea,
  Button,
  Dropdown,
  DatePicker,
  Modal,
} from '@/components';
import {
  categoryOptions,
  dayOptions,
  timeOptions,
} from '@/constants/lesson-options';
import { components } from '@/types/api';
import { useGetMemberBranch } from '@apis';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

export type CreateLessonRequest =
  components['schemas']['CreateLessonRequestDTO'];

const Page = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: createLesson, isPending } = usePostLesson();
  const {
    mutate: checkAvailability,
    data: availabilityData,
    isPending: isCheckingAvailability,
  } = useCheckAvailability();
  const response = useGetMemberBranch();
  const myBranch = response.data?.result;
  const [disabledTimeSlots, setDisabledTimeSlots] = useState<string[]>([]);

  // 오늘 날짜를 한국어 형식으로 포맷
  const getTodayFormatted = () => {
    const today = new Date();
    return today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const [formData, setFormData] = useState({
    title: '',
    instructorIntro: '',
    lessonIntro: '',
    fee: '',
    category: '',
    startDate: '',
    endDate: '',
    days: '',
    time: '',
    lessonImage: null as File | null,
    lessonDescription: '',
    expectedParticipants: '20',
    additionalContents: [] as string[],
  });

  const handleInputChange = (
    field: string,
    value: string | boolean | File | null | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const checkTimeAvailability = async () => {
    if (
      formData.startDate &&
      formData.endDate &&
      formData.days &&
      myBranch!.branchId
    ) {
      // 먼저 시간 없이 한번 호출해서 timeSlots 배열 확인
      const durationWithoutTime = `${formData.startDate} ~ ${formData.endDate} ${formData.days}`;

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
              branchId: myBranch!.branchId!,
              duration: durationWithoutTime,
            },
            {
              onSuccess: resolve,
              onError: reject,
            }
          );
        });

        // timeSlots 배열이 있고 여러 시간대 정보를 포함하고 있으면 한번 호출로 처리
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
        // Single call 실패시 fallback
      }
      const unavailableSlots: string[] = [];

      // Fallback: 기존 방식으로 모든 시간대를 순차적으로 체크
      for (const timeOption of timeOptions) {
        const duration = `${formData.startDate} ~ ${formData.endDate} ${formData.days} ${timeOption.value}`;

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
                branchId: myBranch!.branchId!,
                duration,
              },
              {
                onSuccess: resolve,
                onError: reject,
              }
            );
          });

          // 사용 불가능한 시간대인지 확인
          if (
            !result?.result?.available ||
            result?.result?.availableRoomsCount === 0
          ) {
            unavailableSlots.push(timeOption.value);
          }
        } catch (error) {
          // 에러가 발생한 시간대는 사용 불가로 처리
          unavailableSlots.push(timeOption.value);
        }

        // API 부하 방지를 위한 짧은 딜레이
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setDisabledTimeSlots(unavailableSlots);
    }
  };

  useEffect(() => {
    if (
      formData.startDate &&
      formData.endDate &&
      formData.days &&
      formData.days !== ''
    ) {
      checkTimeAvailability();
    } else {
      // 조건이 충족되지 않으면 비활성화 상태 초기화
      setDisabledTimeSlots([]);
    }
  }, [formData.startDate, formData.endDate, formData.days, myBranch!.branchId]);

  const handleAddContent = () => {
    setFormData((prev) => ({
      ...prev,
      additionalContents: [...prev.additionalContents, ''],
    }));
  };

  const handleAdditionalContentChange = (index: number, value: string) => {
    const newContents = [...formData.additionalContents];
    newContents[index] = value;
    handleInputChange('additionalContents', newContents);
  };

  const removeAdditionalContent = (index: number) => {
    const newContents = formData.additionalContents.filter(
      (_, i) => i !== index
    );
    handleInputChange('additionalContents', newContents);
  };

  const handleSubmit = () => {
    if (!myBranch!.branchId) {
      alert('지점 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      return;
    }

    // 카테고리 매핑 (OpenAPI enum과 일치)
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

    // 상위 필드
    fd.append('lessonName', formData.title);
    fd.append('instructor', formData.instructorIntro);
    fd.append('instruction', formData.instructorIntro);
    fd.append('description', formData.lessonIntro);
    fd.append('category', categoryMap[formData.category]);
    fd.append('branchId', String(myBranch!.branchId));

    // 단일 기수 예시 (i = 0)
    const i = 0;
    const capacity = parseInt(formData.expectedParticipants || '0', 10) || 20;
    const lessonFee = parseInt(formData.fee || '0', 10) || 0;
    const duration = `${formData.startDate}~${formData.endDate} ${formData.days} ${formData.time}`;
    const lessonRoomId = 1;

    fd.append(`lessonGisus[${i}].capacity`, String(capacity));
    fd.append(`lessonGisus[${i}].lessonFee`, String(lessonFee));
    fd.append(`lessonGisus[${i}].duration`, duration);
    fd.append(`lessonGisus[${i}].lessonRoomId`, String(lessonRoomId));

    const curriculums = [
      { content: formData.lessonDescription },
      ...formData.additionalContents
        .filter((c) => c.trim() !== '')
        .map((c) => ({ content: c })),
    ];

    curriculums.forEach((c, j) => {
      fd.append(`lessonGisus[${i}].curriculums[${j}].content`, c.content);
    });

    // 파일
    if (formData.lessonImage) {
      fd.append('lessonImg', formData.lessonImage, formData.lessonImage.name);
    }

    /* === 중요: 혹시 남아있을지 모를 잘못된 키 제거 === */
    fd.delete('lessonGisus'); // JSON 문자열로 넣던 흔적 제거
    fd.delete('lessonGisus[0]'); // 인덱스만 있는 잘못된 키 제거

    // 전송 직전 실제 페어 확인
    for (const [k, v] of fd.entries()) console.log(k, v);

    // 전송
    createLesson(fd, {
      onSuccess: () => {
        setShowSuccessModal(true);
      },
      onError: (error) => {
        console.error('강좌 개설 실패:', error);
        alert('강좌 개설에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  const handleRemoveImage = () => {
    handleInputChange('lessonImage', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Layout header={<Header title='강좌 개설하기' showBackButton={true} />}>
      <div className='mb-[4rem] flex w-full flex-col gap-[2rem]'>
        {/* 강좌 제목 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강좌 제목</h2>
          <Input
            type='text'
            placeholder='예) 디지털 카메라 기초 완성'
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            fullWidth
            containerClassName='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>

        {/* 강사 소개 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강사 소개</h2>
          <Textarea
            placeholder='자기소개를 작성해주세요 경력, 전문분야, 강좌 스타일 등을 포함해주세요'
            value={formData.instructorIntro}
            onChange={(e) =>
              handleInputChange('instructorIntro', e.target.value)
            }
            rows={4}
            fullWidth
            containerClassName='!w-full !h-[12rem] !px-[2rem] !py-[2rem] !pb-[3.2rem] !gap-[0.6rem]'
          />
        </div>

        {/* 강좌 소개 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강좌 소개</h2>
          <Textarea
            placeholder='강좌 내용과 목표를 자세히 작성해주세요'
            value={formData.lessonIntro}
            onChange={(e) => handleInputChange('lessonIntro', e.target.value)}
            rows={4}
            fullWidth
            containerClassName='!w-full !h-[12rem] !px-[2rem] !py-[2rem] !pb-[3.2rem] !gap-[0.6rem]'
          />
        </div>

        {/* 비용 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>비용</h2>
          <Input
            type='number'
            placeholder='10,000'
            value={formData.fee}
            onChange={(e) => handleInputChange('fee', e.target.value)}
            fullWidth
            containerClassName='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>

        {/* 카테고리 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>카테고리</h2>
          <Dropdown
            options={categoryOptions}
            value={formData.category}
            placeholder='카테고리를 선택하세요'
            onChange={(value) => handleInputChange('category', value)}
            className='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>

        {/* 강의 시작일 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 시작일</h2>
          <DatePicker
            value={formData.startDate}
            onChange={(value) => handleInputChange('startDate', value)}
            placeholder={getTodayFormatted()}
            className='!h-[5.6rem] !px-[2rem] !py-0'
            minDate={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* 강의 종료일 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 종료일</h2>
          <DatePicker
            value={formData.endDate}
            onChange={(value) => handleInputChange('endDate', value)}
            placeholder={getTodayFormatted()}
            className='!h-[5.6rem] !px-[2rem] !py-0'
            minDate={
              formData.startDate || new Date().toISOString().split('T')[0]
            }
          />
        </div>

        {/* 강의 요일 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 요일</h2>
          <Dropdown
            options={dayOptions}
            value={formData.days}
            placeholder='월, 수'
            onChange={(value) => handleInputChange('days', value)}
            className='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>

        {/* 강의 시간 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 시간</h2>
          <Dropdown
            options={timeOptions.map((option) => ({
              ...option,
              disabled: disabledTimeSlots.includes(option.value),
            }))}
            value={formData.time}
            placeholder='11:00 ~ 13:00'
            onChange={(value) => handleInputChange('time', value)}
            className='!h-[5.6rem] !px-[2rem] !py-0'
          />
          {isCheckingAvailability && (
            <p className='mt-2 text-sm text-gray-500'>시간대 확인 중...</p>
          )}
        </div>

        {/* 강의 사진 등록 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>
            강의 사진 등록
          </h2>
          <div className='rounded-16 border-gray7eb border border-dashed bg-white px-[2rem] py-[3rem] text-center'>
            <Input
              type='file'
              id='lessonImage'
              ref={fileInputRef}
              accept='image/*'
              className='hidden'
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.files && target.files[0]) {
                  handleInputChange('lessonImage', target.files[0]);
                }
              }}
              containerClassName='!p-0 !border-none !bg-transparent !rounded-none'
            />
            {formData.lessonImage ? (
              <div className='relative'>
                <Image
                  src={URL.createObjectURL(formData.lessonImage)}
                  alt='업로드된 이미지'
                  width={480}
                  height={320}
                  className='rounded-12 max-h-[20rem] w-full object-contain'
                  unoptimized
                />
                <Button
                  onClick={handleRemoveImage}
                  variant='line'
                  sizeType='xs'
                  className='!bg-red !absolute top-2 right-2 !h-6 !w-6 !rounded-full !p-0 text-sm text-white'
                >
                  ×
                </Button>
              </div>
            ) : (
              <label
                htmlFor='lessonImage'
                className='flex cursor-pointer flex-col items-center space-y-[1rem]'
              >
                <IcImageUpload height={14} width={14} />
              </label>
            )}
          </div>
        </div>

        {/* 강좌 내용 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강좌 내용</h2>
          <Textarea
            placeholder='1차시에 진행되는 강좌 내용을 적어주세요'
            value={formData.lessonDescription}
            onChange={(e) =>
              handleInputChange('lessonDescription', e.target.value)
            }
            rows={4}
            fullWidth
            containerClassName='!w-full !h-[12rem] !px-[2rem] !py-[2rem] !pb-[3.2rem] !gap-[0.6rem]'
          />
        </div>

        {/* 추가 강좌 내용들 */}
        {formData.additionalContents.map((content, index) => (
          <div key={index} className='w-full'>
            <div className='mb-[1.2rem] flex w-full items-center justify-between'>
              <h2 className='font-medium-20 text-black'>
                강좌 내용 {index + 2}차시
              </h2>
              <Button
                onClick={() => removeAdditionalContent(index)}
                variant='line'
                sizeType='xs'
                className='text-red font-medium-16 !w-auto !border-none !px-4'
              >
                삭제
              </Button>
            </div>
            <Textarea
              placeholder={`${index + 2}차시에 진행되는 강좌 내용을 적어주세요`}
              value={content}
              onChange={(e) =>
                handleAdditionalContentChange(index, e.target.value)
              }
              rows={4}
              fullWidth={true}
            />
          </div>
        ))}

        {/* + 버튼 */}
        <div className='w-full'>
          <Button
            onClick={handleAddContent}
            variant='line'
            sizeType='xs'
            className='bg-gray9a0 font-medium-16 rounded-6 h-[4rem] border-none text-white'
          >
            +
          </Button>
        </div>

        {/* 예상 정원 */}
        <div className='flex w-full items-center space-x-[1rem]'>
          <IcUsers height={24} width={24} />
          <span className='text-gray353 font-medium-22'>예상 정원</span>
          <div className='rounded-16 border-gray7eb ml-auto flex h-[5.6rem] w-[18.5rem] items-center justify-end border bg-white px-[1.7rem]'>
            <Input
              type='number'
              placeholder='20'
              value={formData.expectedParticipants}
              onChange={(e) =>
                handleInputChange('expectedParticipants', e.target.value)
              }
              className='text-right'
              containerClassName='!border-none !bg-transparent !p-0 !rounded-none !h-auto'
            />
            <span className='font-medium-20 ml-[0.5rem] text-black'>명</span>
          </div>
        </div>
      </div>

      {/* 강좌 개설하기 버튼 */}
      <Button
        onClick={handleSubmit}
        variant='green'
        sizeType='lg'
        className='h-[6.3rem] text-center font-bold text-white'
        disabled={isPending}
        style={{ fontFamily: 'Inter', fontSize: '22px', lineHeight: '21.6px' }}
      >
        {isPending ? '강좌 개설 중...' : '강좌 개설하기'}
      </Button>

      {showSuccessModal && (
        <Modal
          title='신청이 완료되었습니다'
          greenButtonText='확인'
          onClickGreenButton={() => {
            setShowSuccessModal(false);
            router.push('/reservation/lesson');
          }}
        />
      )}
    </Layout>
  );
};

export default Page;
