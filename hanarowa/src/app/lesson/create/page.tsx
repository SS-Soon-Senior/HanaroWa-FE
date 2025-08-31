'use client';

import { IcImageUpload, IcUsers } from '@/assets/svg';
import {
  Layout,
  Header,
  Input,
  Textarea,
  Button,
  Dropdown,
} from '@/components';
import {
  categoryOptions,
  dayOptions,
  endDateOptions,
  startDateOptions,
  timeOptions,
} from '@/constants/lesson-options';
import { usePostLesson } from '@/apis/lesson';
import { CreateLessonRequest } from '@/apis/lesson/postLesson';
import React, { useState, useRef } from 'react';

const Page = () => {
  const { mutate: createLesson, isPending } = usePostLesson();
  
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
    // localStorage에서 branchId 가져오기
    const branchId = localStorage.getItem('branchId');
    
    if (!branchId) {
      alert('지점 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      return;
    }

    // 카테고리 값을 API에서 요구하는 형식으로 매핑
    const categoryMap: Record<string, CreateLessonRequest['category']> = {
      '디지털': 'DIGITAL',
      '어학': 'LANGUAGE', 
      '트렌드': 'TREND',
      '기타': 'OTHERS',
      '금융': 'FINANCE',
      '건강': 'HEALTH',
      '문화': 'CULTURE',
    };

    // 강좌 내용들을 커리큘럼 형태로 변환
    const curriculums = [
      { content: formData.lessonDescription },
      ...formData.additionalContents.map(content => ({ content }))
    ].filter(curriculum => curriculum.content.trim() !== '');

    const requestData: CreateLessonRequest = {
      lessonName: formData.title,
      instructor: formData.instructorIntro,
      instruction: formData.instructorIntro, // 강사 소개를 instruction으로 사용
      description: formData.lessonIntro,
      category: categoryMap[formData.category] || 'OTHERS',
      lessonImg: formData.lessonImage ? URL.createObjectURL(formData.lessonImage) : undefined,
      branchId: parseInt(branchId),
      lessonGisus: [{
        capacity: parseInt(formData.expectedParticipants) || 20,
        lessonFee: parseInt(formData.fee) || 0,
        duration: `${formData.startDate} ~ ${formData.endDate} ${formData.days} ${formData.time}`,
        curriculums: curriculums,
      }],
    };

    console.log('강좌 개설 데이터:', requestData);
    createLesson(requestData);
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
                {/* 나중에 Next Image로 바꾸세요. */}
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
        style={{
          fontFamily: 'Inter',
          fontSize: '22px',
          lineHeight: '21.6px',
        }}
      >
        {isPending ? '강좌 개설 중...' : '강좌 개설하기'}
      </Button>
    </Layout>
  );
};

export default Page;
