'use client';

import { usePostLesson } from '@/apis/lesson';
import { IcImageUpload, IcUsers } from '@/assets/svg';
import {
  Layout,
  Header,
  Input,
  Textarea,
  Button,
  Dropdown,
} from '@/components';
import { CATEGORY_META } from '@/constants/category';
import {
  categoryOptions,
  dayOptions,
  endDateOptions,
  startDateOptions,
  timeOptions,
} from '@/constants/lesson-options';
import { useBranch } from '@/hooks';
import { components } from '@/types/api';
import React, { useState, useRef } from 'react';

export type CreateLessonRequest =
  components['schemas']['CreateLessonRequestDTO'];

const Page = () => {
  const { mutate: createLesson, isPending } = usePostLesson();
  const { myBranch } = useBranch();

  const [formData, setFormData] = useState({
    title: '',
    instructorIntro: '',
    lessonIntro: '',
    fee: '',
    category: '',
    startDate: '2025-08-18',
    endDate: '2025-08-30',
    days: '월, 수',
    time: '11:00 ~ 13:00',
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
    if (!myBranch.branchId) {
      alert('지점 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      return;
    }

    // 카테고리 매핑 (OpenAPI enum과 일치)
    const categoryMap: Record<string, CreateLessonRequest['category']> = {
      [CATEGORY_META.digital.title]: 'DIGITAL',
      [CATEGORY_META.language.title]: 'LANGUAGE',
      [CATEGORY_META.trend.title]: 'TREND',
      [CATEGORY_META.others.title]: 'OTHERS',
      [CATEGORY_META.finance.title]: 'FINANCE',
      [CATEGORY_META.health.title]: 'HEALTH',
      [CATEGORY_META.culture.title]: 'CULTURE',
    };

    const fd = new FormData();

    // 상위 필드
    fd.append('lessonName', formData.title);
    fd.append('instructor', formData.instructorIntro);
    fd.append('instruction', formData.instructorIntro);
    fd.append('description', formData.lessonIntro);
    fd.append('category', categoryMap[formData.category] || 'OTHERS');
    fd.append('branchId', String(myBranch.branchId));

    // 단일 기수 예시 (i = 0)
    const i = 0;
    const capacity = parseInt(formData.expectedParticipants || '0', 10) || 20;
    const lessonFee = parseInt(formData.fee || '0', 10) || 0;
    const duration = `${formData.startDate} ~ ${formData.endDate} ${formData.days} ${formData.time}`;
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
    createLesson(fd);
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
          <Dropdown
            options={startDateOptions}
            value={formData.startDate}
            placeholder='2025-08-18'
            onChange={(value) => handleInputChange('startDate', value)}
            className='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>

        {/* 강의 종료일 */}
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 종료일</h2>
          <Dropdown
            options={endDateOptions}
            value={formData.endDate}
            placeholder='2025-08-30'
            onChange={(value) => handleInputChange('endDate', value)}
            className='!h-[5.6rem] !px-[2rem] !py-0'
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
            options={timeOptions}
            value={formData.time}
            placeholder='11:00 ~ 13:00'
            onChange={(value) => handleInputChange('time', value)}
            className='!h-[5.6rem] !px-[2rem] !py-0'
          />
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(formData.lessonImage)}
                  alt='업로드된 이미지'
                  className='rounded-12 max-h-[20rem] w-full object-contain'
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
    </Layout>
  );
};

export default Page;
