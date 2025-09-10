'use client';

import { IcUsers } from '@/assets/svg';
import { Input, Textarea, Button } from '@/components';
import type { LessonFormData } from '@/types/lesson';
import {
  handleNumberKeyDown,
  handleNumberInput,
  createNumberChangeHandler,
} from '@/utils/numberInput';

interface ContentFieldsProps {
  formData: LessonFormData;
  onInputChange: (
    field: keyof LessonFormData,
    value: string | boolean | File | null | string[]
  ) => void;
  onAddContent: () => void;
  onAdditionalContentChange: (index: number, value: string) => void;
  onRemoveAdditionalContent: (index: number) => void;
}

export const ContentFields = ({
  formData,
  onInputChange,
  onAddContent,
  onAdditionalContentChange,
  onRemoveAdditionalContent,
}: ContentFieldsProps) => {
  return (
    <>
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
            onChange={createNumberChangeHandler(
              'expectedParticipants',
              (field, value) =>
                onInputChange(field as keyof LessonFormData, value)
            )}
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