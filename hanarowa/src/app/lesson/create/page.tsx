'use client';

import { IcImageUpload, IcUsers } from '@/assets/svg';
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
    startDate: '2025-08-18',
    endDate: '2025-08-30',
    days: '월, 수',
    time: '11:00 ~ 13:00',
    lessonImage: null as File | null,
    lessonDescription: '',
    expectedParticipants: '20',
    additionalContents: [] as string[], // 추가 강좌 내용들
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
    { value: 'mon-wed', label: '월, 수' },
    { value: 'tue-thu', label: '화, 목' },
    { value: 'mon-fri', label: '월, 화, 수, 목, 금' },
    { value: 'weekend', label: '토, 일' },
    { value: 'daily', label: '매일' },
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

  const startDateOptions = [
    { value: '2025-08-18', label: '2025-08-18' },
    { value: '2025-08-19', label: '2025-08-19' },
    { value: '2025-08-20', label: '2025-08-20' },
  ];

  const endDateOptions = [
    { value: '2025-08-30', label: '2025-08-30' },
    { value: '2025-08-31', label: '2025-08-31' },
    { value: '2025-09-01', label: '2025-09-01' },
  ];

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
    console.log('강좌 개설 데이터:', formData);
    // API 호출 로직 구현
  };

  return (
    <Layout header={<Header title='강좌 개설하기' showBackButton={true} />}>
      <div className='space-y-[3rem]'>
        {/* 강좌 제목 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강좌 제목
          </h2>
          <Input
            type='text'
            placeholder='예) 디지털 카메라 기초 완성'
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            fullWidth
          />
        </div>

        {/* 강사 소개 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강사 소개
          </h2>
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
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강좌 소개
          </h2>
          <Textarea
            placeholder='강좌 내용과 목표를 자세히 작성해주세요'
            value={formData.lessonIntro}
            onChange={(e) => handleInputChange('lessonIntro', e.target.value)}
            rows={4}
            fullWidth
          />
        </div>

        {/* 비용 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            비용
          </h2>
          <Input
            type='text'
            placeholder='10,000원'
            value={formData.fee}
            onChange={(e) => handleInputChange('fee', e.target.value)}
            fullWidth
          />
        </div>

        {/* 카테고리 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            카테고리
          </h2>
          <Dropdown
            options={categoryOptions}
            value={formData.category}
            placeholder='카테고리를 선택하세요'
            onChange={(value) => handleInputChange('category', value)}
            fullWidth
          />
        </div>

        {/* 강의 시작일 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강의 시작일
          </h2>
          <Dropdown
            options={startDateOptions}
            value={formData.startDate}
            placeholder='2025-08-18'
            onChange={(value) => handleInputChange('startDate', value)}
            fullWidth
          />
        </div>

        {/* 강의 종료일 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강의 종료일
          </h2>
          <Dropdown
            options={endDateOptions}
            value={formData.endDate}
            placeholder='2025-08-30'
            onChange={(value) => handleInputChange('endDate', value)}
            fullWidth
          />
        </div>

        {/* 강의 요일 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강의 요일
          </h2>
          <Dropdown
            options={dayOptions}
            value={formData.days}
            placeholder='월, 수'
            onChange={(value) => handleInputChange('days', value)}
            fullWidth
          />
        </div>

        {/* 강의 시간 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강의 시간
          </h2>
          <Dropdown
            options={timeOptions}
            value={formData.time}
            placeholder='11:00 ~ 13:00'
            onChange={(value) => handleInputChange('time', value)}
            fullWidth
          />
        </div>

        {/* 강의 사진 등록 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강의 사진 등록
          </h2>
          <div className='rounded-16 border-gray7eb border border-dashed bg-white px-[2rem] py-[3rem] text-center'>
            <input
              type='file'
              id='lessonImage'
              accept='image/*'
              className='hidden'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleInputChange('lessonImage', e.target.files[0]);
                }
              }}
            />
            {formData.lessonImage ? (
              <div className='relative'>
                <img
                  src={URL.createObjectURL(formData.lessonImage)}
                  alt='업로드된 이미지'
                  className='rounded-12 max-h-[20rem] w-full object-contain'
                />
                <button
                  type='button'
                  onClick={() => handleInputChange('lessonImage', null)}
                  className='bg-red absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-sm text-white'
                >
                  ×
                </button>
              </div>
            ) : (
              <label
                htmlFor='lessonImage'
                className='flex cursor-pointer flex-col items-center space-y-[1rem]'
              >
                <IcImageUpload height={30} width={30} />
                <span className='font-medium-16 text-gray3af'>
                  사진을 업로드하세요
                </span>
              </label>
            )}
          </div>
        </div>

        {/* 강좌 내용 */}
        <div>
          <h2 className='font-hana mb-[1.5rem] text-[2rem] leading-[2.16rem] font-medium text-black'>
            강좌 내용
          </h2>
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

        {/* 추가 강좌 내용들 */}
        {formData.additionalContents.map((content, index) => (
          <div key={index}>
            <div className='mb-[1.5rem] flex items-center justify-between'>
              <h2 className='font-hana text-[2rem] leading-[2.16rem] font-medium text-black'>
                강좌 내용 {index + 2}차시
              </h2>
              <button
                type='button'
                onClick={() => removeAdditionalContent(index)}
                className='text-red font-medium-16'
              >
                삭제
              </button>
            </div>
            <Textarea
              placeholder={`${index + 2}차시에 진행되는 강좌 내용을 적어주세요`}
              value={content}
              onChange={(e) =>
                handleAdditionalContentChange(index, e.target.value)
              }
              rows={4}
              fullWidth
            />
          </div>
        ))}
        {/* + 버튼 */}
        <div>
          <Button
            onClick={handleAddContent}
            variant='line'
            sizeType='xs'
            className='bg-gray9a0 font-medium-16 rounded-6 h-[1.6rem] border-none text-white'
          >
            +
          </Button>
        </div>

        {/* 예상 정원 */}
        <div className='flex items-center space-x-[1rem]'>
          <IcUsers height={24} width={24} />
          <span className='text-main font-hana text-[2rem] leading-[2.16rem] font-medium'>
            예상 정원
          </span>
          <div className='rounded-16 border-gray7eb ml-auto flex h-[5.6rem] w-[18.5rem] items-center justify-end border bg-white px-[1.7rem]'>
            <Input
              type='number'
              placeholder='20'
              value={formData.expectedParticipants}
              onChange={(e) =>
                handleInputChange('expectedParticipants', e.target.value)
              }
              className='text-right'
              containerClassName='border-none bg-transparent p-0'
            />
            <span className='font-medium-18 ml-[0.5rem] text-black'>명</span>
          </div>
        </div>

        {/* 강좌 개설하기 버튼 */}
        <div className='pb-[2rem]'>
          <Button
            onClick={handleSubmit}
            variant='green'
            sizeType='lg'
            className='text-center font-bold text-white'
            style={{
              fontFamily: 'Inter',
              fontSize: '22px',
              lineHeight: '21.6px',
            }}
          >
            강좌 개설하기
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LessonCreatePage;
