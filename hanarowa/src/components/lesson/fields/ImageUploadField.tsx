'use client';

import { IcImageUpload } from '@/assets/svg';
import { Input, Button, ErrorMessage } from '@/components';
import type { LessonFormData } from '@/types/lesson';
import Image from 'next/image';
import React from 'react';

interface ImageUploadFieldProps {
  formData: LessonFormData;
  imageError: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (
    field: keyof LessonFormData,
    value: string | boolean | File | null | string[]
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export const ImageUploadField = ({
  formData,
  imageError,
  fileInputRef,
  onImageUpload,
  onRemoveImage,
}: ImageUploadFieldProps) => {
  return (
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
  );
};