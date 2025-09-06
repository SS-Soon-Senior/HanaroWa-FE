import { RefObject, ChangeEvent } from 'react';
import { IcImageUpload, IcUsers } from '@/assets/svg';
import {
  Input,
  Textarea,
  Button,
  Dropdown,
  DatePicker,
  ErrorMessage,
} from '@/components';
import { categoryOptions, dayOptions, timeOptions } from '@/constants';
import { handleNumberKeyDown, handleNumberInput, createNumberChangeHandler } from '@/utils/numberInput';
import Image from 'next/image';
import { LessonFormData } from '@/types/lesson';
import { components } from '@/types/api';

interface LessonFormFieldsProps {
  formData: LessonFormData;
  imageError: string;
  disabledTimeSlots: string[];
  isCheckingAvailability: boolean;
  isAdmin: boolean;
  branches?: components['schemas']['BranchResponseDTO'][];
  fileInputRef: RefObject<HTMLInputElement | null>;
  onInputChange: (field: keyof LessonFormData, value: string | boolean | File | null | string[]) => void;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAddContent: () => void;
  onAdditionalContentChange: (index: number, value: string) => void;
  onRemoveAdditionalContent: (index: number) => void;
  getTodayFormatted: () => string;
}

export const LessonFormFields = ({
  formData,
  imageError,
  disabledTimeSlots,
  isCheckingAvailability,
  isAdmin,
  branches = [] as components['schemas']['BranchResponseDTO'][],
  fileInputRef,
  onInputChange,
  onImageUpload,
  onRemoveImage,
  onAddContent,
  onAdditionalContentChange,
  onRemoveAdditionalContent,
  getTodayFormatted,
}: LessonFormFieldsProps) => {
  return (
    <>
      {/* 강좌 제목 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강좌 제목</h2>
        <Input
          type='text'
          placeholder='예) 디지털 카메라 기초 완성'
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          fullWidth
          containerClassName='!h-[5.6rem] !px-[2rem] !py-0'
        />
      </div>

      {/* 강사 이름 (관리자만) */}
      {isAdmin && (
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>강사 이름</h2>
          <Input
            type='text'
            placeholder='외부 강사 이름을 입력하세요'
            value={formData.instructorName}
            onChange={(e) => onInputChange('instructorName', e.target.value)}
            fullWidth
            containerClassName='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>
      )}

      {/* 강사 소개 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강사 소개</h2>
        <Textarea
          placeholder='자기소개를 작성해주세요 경력, 전문분야, 강좌 스타일 등을 포함해주세요'
          value={formData.instructorIntro}
          onChange={(e) => onInputChange('instructorIntro', e.target.value)}
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
          onChange={(e) => onInputChange('lessonIntro', e.target.value)}
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
          onChange={createNumberChangeHandler('fee', (field, value) => onInputChange(field as keyof LessonFormData, value))}
          onKeyDown={handleNumberKeyDown}
          onInput={handleNumberInput}
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
          onChange={(value) => onInputChange('category', value)}
          className='!h-[5.6rem] !px-[2rem] !py-0'
        />
      </div>

      {/* 지점 선택 (관리자만) */}
      {isAdmin && (
        <div className='w-full'>
          <h2 className='font-medium-20 mb-[1.2rem] text-black'>지점 선택</h2>
          <Dropdown
            options={branches.map((branch) => ({
              label: branch.branchName || '',
              value: String(branch.branchId || ''),
            }))}
            value={formData.branchId}
            placeholder='지점을 선택하세요'
            onChange={(value) => onInputChange('branchId', value)}
            className='!h-[5.6rem] !px-[2rem] !py-0'
          />
        </div>
      )}

      {/* 강의 시작일 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 시작일</h2>
        <DatePicker
          value={formData.startDate}
          onChange={(value) => onInputChange('startDate', value)}
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
          onChange={(value) => onInputChange('endDate', value)}
          placeholder={getTodayFormatted()}
          className='!h-[5.6rem] !px-[2rem] !py-0'
          minDate={formData.startDate || new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* 강의 요일 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 요일</h2>
        <Dropdown
          options={dayOptions}
          value={formData.days}
          placeholder='월, 수'
          onChange={(value) => onInputChange('days', value)}
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
          onChange={(value) => onInputChange('time', value)}
          className='!h-[5.6rem] !px-[2rem] !py-0'
        />
        {isCheckingAvailability && (
          <p className='mt-2 text-sm text-gray-500'>시간대 확인 중...</p>
        )}
      </div>

      {/* 강의 사진 등록 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강의 사진 등록</h2>
        <div className='rounded-16 border-gray7eb border border-dashed bg-white px-[2rem] py-[3rem] text-center'>
          <Input
            type='file'
            id='lessonImage'
            ref={fileInputRef}
            accept='image/*'
            className='hidden'
            onChange={onImageUpload}
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
                onClick={onRemoveImage}
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
        {imageError && (
          <div className='mt-2'>
            <ErrorMessage>{imageError}</ErrorMessage>
          </div>
        )}
      </div>

      {/* 강좌 내용 */}
      <div className='w-full'>
        <h2 className='font-medium-20 mb-[1.2rem] text-black'>강좌 내용</h2>
        <Textarea
          placeholder='1차시에 진행되는 강좌 내용을 적어주세요'
          value={formData.lessonDescription}
          onChange={(e) => onInputChange('lessonDescription', e.target.value)}
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
              onClick={() => onRemoveAdditionalContent(index)}
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
            onChange={(e) => onAdditionalContentChange(index, e.target.value)}
            rows={4}
            fullWidth={true}
          />
        </div>
      ))}

      {/* + 버튼 */}
      <div className='w-full'>
        <Button
          onClick={onAddContent}
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
            onChange={createNumberChangeHandler('expectedParticipants', (field, value) => onInputChange(field as keyof LessonFormData, value))}
            onKeyDown={handleNumberKeyDown}
            onInput={handleNumberInput}
            className='text-right'
            containerClassName='!border-none !bg-transparent !p-0 !rounded-none !h-auto'
          />
          <span className='font-medium-20 ml-[0.5rem] text-black'>명</span>
        </div>
      </div>
    </>
  );
};
