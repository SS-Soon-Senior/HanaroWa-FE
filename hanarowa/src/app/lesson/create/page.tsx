'use client';

import Button from '@/components/atoms/Button';
import Dropdown from '@/components/atoms/Dropdown';
import Header from '@/components/atoms/Header';
import Input from '@/components/atoms/Input';
import Layout from '@/components/atoms/Layout';
import Textarea from '@/components/atoms/Textarea';
import React, { useState } from 'react';

const LessonCreatePage = () => {
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
    timeAgreement: false,
    lessonDescription: '',
  });

  // 드롭다운 옵션들
  const categoryOptions = [
    { value: 'language', label: '어학' },
    { value: 'programming', label: '프로그래밍' },
    { value: 'art', label: '예술' },
    { value: 'music', label: '음악' },
    { value: 'cooking', label: '요리' },
    { value: 'etc', label: '기타' },
  ];

  const dayOptions = [
    { value: 'mon-fri', label: '월, 화, 수, 목, 금' },
    { value: 'weekend', label: '토, 일' },
    { value: 'daily', label: '매일' },
    { value: 'custom', label: '직접 선택' },
  ];

  const timeOptions = [
    { value: '09:00-10:00', label: '09:00 ~ 10:00' },
    { value: '10:00-11:00', label: '10:00 ~ 11:00' },
    { value: '11:00-12:00', label: '11:00 ~ 12:00' },
    { value: '11:00-13:00', label: '11:00 ~ 13:00' },
    { value: '13:00-14:00', label: '13:00 ~ 14:00' },
    { value: '14:00-15:00', label: '14:00 ~ 15:00' },
    { value: '15:00-16:00', label: '15:00 ~ 16:00' },
    { value: '16:00-17:00', label: '16:00 ~ 17:00' },
    { value: '17:00-18:00', label: '17:00 ~ 18:00' },
    { value: '18:00-19:00', label: '18:00 ~ 19:00' },
    { value: '19:00-20:00', label: '19:00 ~ 20:00' },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('강좌 개설 데이터:', formData);
    // API 호출 로직 구현
  };

  return (
    <Layout header={<Header title='강좌 개설하기' showBackButton={true} />}>
      <div className='space-y-[2rem]'>
        {/* 강좌 제목 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>강좌 제목</h2>
          <Input
            type='text'
            placeholder='예) 디지털 카메라 기초 완성'
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            fullWidth
          />
        </div>

        {/* 강사 소개 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>강사 소개</h2>
          <Textarea
            placeholder='자기소개를 작성해주세요&#10;경력, 전문분야, 강좌 스타일 등을 포함해주세요'
            value={formData.instructorIntro}
            onChange={(e) =>
              handleInputChange('instructorIntro', e.target.value)
            }
            rows={4}
            fullWidth
          />
        </div>

        {/* 강좌 소개 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>강좌 소개</h2>
          <Textarea
            placeholder='강좌 내용과 목표를 자세히 작성해주세요'
            value={formData.lessonIntro}
            onChange={(e) => handleInputChange('lessonIntro', e.target.value)}
            rows={4}
            fullWidth
          />
        </div>

        {/* 비용 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>비용</h2>
          <Input
            type='number'
            placeholder='10,000'
            value={formData.fee}
            onChange={(e) => handleInputChange('fee', e.target.value)}
            rightContent={
              <span className='font-medium-18 text-gray3af ml-[1rem]'>원</span>
            }
            fullWidth
          />
        </div>

        {/* 카테고리 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>카테고리</h2>
          <Dropdown
            options={categoryOptions}
            value={formData.category}
            placeholder='카테고리를 선택하세요'
            onChange={(value) => handleInputChange('category', value)}
            fullWidth
          />
        </div>

        {/* 강의 시작일 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>강의 시작일</h2>
          <Input
            type='date'
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            fullWidth
          />
        </div>

        {/* 강의 종료일 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>강의 종료일</h2>
          <Input
            type='date'
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            fullWidth
          />
        </div>

        {/* 강의 요일 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>강의 요일</h2>
          <Dropdown
            options={dayOptions}
            value={formData.days}
            placeholder='월, 수'
            onChange={(value) => handleInputChange('days', value)}
            fullWidth
          />
        </div>

        {/* 강의 시간 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>강의 시간</h2>
          <Dropdown
            options={timeOptions}
            value={formData.time}
            placeholder='11:00 ~ 13:00'
            onChange={(value) => handleInputChange('time', value)}
            fullWidth
          />
        </div>

        {/* 강의 시간 등록 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <div className='flex items-center space-x-[1rem]'>
            <input
              type='checkbox'
              id='timeAgreement'
              checked={formData.timeAgreement}
              onChange={(e) =>
                handleInputChange('timeAgreement', e.target.checked)
              }
              className='text-main bg-gray4f6 border-gray7eb focus:ring-main h-[2rem] w-[2rem] rounded-[0.4rem] border-[0.2rem] focus:ring-2'
            />
            <label
              htmlFor='timeAgreement'
              className='font-medium-18 text-gray280'
            >
              강의 시간 등록
            </label>
          </div>
        </div>

        {/* 강좌 내용 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <h2 className='font-bold-22 mb-[1.5rem] text-black'>강좌 내용</h2>
          <Textarea
            placeholder='1차시에 진행되는 강좌 내용을 적어주세요'
            value={formData.lessonDescription}
            onChange={(e) =>
              handleInputChange('lessonDescription', e.target.value)
            }
            rows={4}
            fullWidth
          />
        </div>

        {/* Add Button */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <Button variant='line' sizeType='lg' className='border-dashed'>
            +
          </Button>
        </div>

        {/* 예상 정원 */}
        <div className='rounded-[1.6rem] bg-white p-[2rem]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-[1rem]'>
              <svg
                className='text-main h-[2rem] w-[2rem]'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='font-bold-22 text-main'>예상 정원</span>
            </div>
            <span className='font-bold-22 text-main'>20명</span>
          </div>
        </div>

        {/* 강좌 개설하기 버튼 */}
        <div className='pb-[2rem]'>
          <Button onClick={handleSubmit} variant='green' sizeType='lg'>
            강좌 개설하기
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LessonCreatePage;
