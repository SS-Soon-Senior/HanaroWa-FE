import { RefObject, ChangeEvent } from 'react';
import { IcImageUpload, IcUsers } from '@/assets/svg';
import {
  Input,
  Textarea,
  Button,
  Dropdown,
  DatePicker,
  LessonStatusTags,
} from '@/components';
import { MultiDaySelector } from '@/components/lesson/MultiDaySelector';
import { categoryOptions, dayOptions, timeOptions } from '@/constants';
import { StatusKey } from '@/constants/status';
import { Lesson, LessonFormData } from '@/types/lesson';
import Image from 'next/image';

// CSS 상수들
const TXT = 'font-medium-16 placeholder:text-gray353';
const INPUT_BOX = '!h-[5.6rem] !px-[2rem] !py-0';
const TEXTAREA_BOX = '!w-full !h-[12rem] !px-[2rem] !py-[2rem] !pb-[3.2rem] !gap-[0.6rem]';
const DROPDOWN_BOX = '!h-[5.6rem] !px-[2rem] !py-0';
const DROPDOWN_W = '!w-full';

// 한글 상태값을 StatusKey로 변환
const convertToStatusKey = (status: string): StatusKey => {
  switch (status) {
    case '승인':
      return 'approved';
    case '반려':
      return 'rejected';
    case '대기중':
      return 'pending';
    default:
      return 'pending';
  }
};

interface LessonEditFormFieldsProps {
  initial: Lesson | null;
  formData: LessonFormData;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onInputChange: <K extends keyof LessonFormData>(field: K, value: LessonFormData[K]) => void;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAddContent: () => void;
  onAdditionalContentChange: (index: number, value: string) => void;
  onRemoveAdditionalContent: (index: number) => void;
}

export const LessonEditFormFields = ({
  initial,
  formData,
  fileInputRef,
  onInputChange,
  onImageUpload,
  onRemoveImage,
  onAddContent,
  onAdditionalContentChange,
  onRemoveAdditionalContent,
}: LessonEditFormFieldsProps) => {
  return (
    <>
      {/* 상태 태그들 */}
      <section className='mt-[3rem] mb-[2rem]'>
        <LessonStatusTags
          currentStatus={convertToStatusKey(initial?.status ?? '대기중')}
        />
      </section>

      {/* 강좌 제목 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강좌 제목</h2>
        <Input
          type='text'
          placeholder={initial?.title ?? '예) 디지털 카메라 기초 완성'}
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          fullWidth
          className={TXT}
          containerClassName={INPUT_BOX}
        />
      </section>

      {/* 강사 이름 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강사 이름</h2>
        <Input
          type='text'
          placeholder={initial?.instructorName ?? '예) 김하나로'}
          value={formData.instructorName}
          onChange={(e) => onInputChange('instructorName', e.target.value)}
          fullWidth
          className={TXT}
          containerClassName={INPUT_BOX}
        />
      </section>

      {/* 강사 소개 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강사 소개</h2>
        <Textarea
          placeholder={
            initial?.instructorIntro ??
            '자기소개를 작성해주세요 경력, 전문분야, 강좌 스타일 등을 포함해주세요'
          }
          value={formData.instructorIntro}
          onChange={(e) => onInputChange('instructorIntro', e.target.value)}
          rows={4}
          fullWidth
          className={TXT}
          containerClassName={TEXTAREA_BOX}
        />
      </section>

      {/* 강좌 소개 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강좌 소개</h2>
        <Textarea
          placeholder={
            initial?.lessonIntro ?? '강좌 내용과 목표를 자세히 작성해주세요'
          }
          value={formData.lessonIntro}
          onChange={(e) => onInputChange('lessonIntro', e.target.value)}
          rows={4}
          fullWidth
          className={TXT}
          containerClassName={TEXTAREA_BOX}
        />
      </section>

      {/* 비용 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>비용</h2>
        <Input
          type='number'
          placeholder={initial?.fee ?? '10,000'}
          value={formData.fee}
          onChange={(e) => onInputChange('fee', e.target.value)}
          fullWidth
          className={TXT}
          containerClassName={INPUT_BOX}
        />
      </section>

      {/* 카테고리 */}
      <section className='w-full'>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>카테고리</h2>
        <Dropdown
          options={categoryOptions}
          value={formData.category}
          placeholder={initial?.category ?? '카테고리를 선택하세요'}
          onChange={(v) => onInputChange('category', v)}
          containerClassName={DROPDOWN_W}
          className={DROPDOWN_BOX}
          labelClassName='font-medium-16'
          placeholderClassName='text-gray353'
        />
      </section>

      {/* 강의 시작일 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강의 시작일</h2>
        <DatePicker
          value={formData.startDate}
          onChange={(value) => onInputChange('startDate', value)}
          placeholder={initial?.startDate ?? '시작일을 선택하세요'}
          className={DROPDOWN_BOX}
          labelClassName='font-medium-16'
          placeholderClassName='text-gray353'
          minDate={new Date().toISOString().split('T')[0]}
        />
      </section>

      {/* 강의 종료일 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강의 종료일</h2>
        <DatePicker
          value={formData.endDate}
          onChange={(value) => onInputChange('endDate', value)}
          placeholder={initial?.endDate ?? '종료일을 선택하세요'}
          className={DROPDOWN_BOX}
          labelClassName='font-medium-16'
          placeholderClassName='text-gray353'
          minDate={formData.startDate || new Date().toISOString().split('T')[0]}
        />
      </section>

      {/* 강의 요일 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강의 요일</h2>
        {/* 🔄 ROLLBACK SAFE: 기존 Dropdown으로 복구 가능 */}
        {/*
        <Dropdown
          options={dayOptions}
          value={formData.days}
          placeholder={initial?.days ?? '월, 수'}
          onChange={(v) => onInputChange('days', v)}
          containerClassName={DROPDOWN_W}
          className={DROPDOWN_BOX}
          labelClassName='font-medium-16'
          placeholderClassName='text-gray353'
        />
        */}
        <MultiDaySelector
          value={formData.days}
          placeholder={initial?.days ?? '월, 수'}
          onChange={(v) => onInputChange('days', v)}
          containerClassName={DROPDOWN_W}
          className={DROPDOWN_BOX}
          labelClassName='font-medium-16'
          placeholderClassName='text-gray353'
        />
      </section>

      {/* 강의 시간 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강의 시간</h2>
        <Dropdown
          options={timeOptions}
          value={formData.time}
          placeholder={initial?.time ?? '11:00 ~ 13:00'}
          onChange={(v) => onInputChange('time', v)}
          containerClassName={DROPDOWN_W}
          className={DROPDOWN_BOX}
          labelClassName='font-medium-16'
          placeholderClassName='text-gray353'
        />
      </section>

      {/* 강의 사진 등록 */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>
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
                type='button'
              >
                ×
              </Button>
            </div>
          ) : initial?.imageUrl ? (
            <div className='relative'>
              <Image
                src={initial.imageUrl}
                alt='기존 이미지'
                width={480}
                height={320}
                className='rounded-12 max-h-[20rem] w-full object-contain'
              />
              <label
                htmlFor='lessonImage'
                className='rounded-6 absolute top-2 right-2 cursor-pointer bg-black/60 px-2 py-1 text-xs text-white'
                title='이미지 변경'
              >
                변경
              </label>
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
      </section>

      {/* 강좌 내용 (1차시) */}
      <section>
        <h2 className='font-medium-16 mb-[2.0rem] text-black'>강좌 내용</h2>
        <Textarea
          placeholder={
            initial?.lessonDescription ??
            '1차시에 진행되는 강좌 내용을 적어주세요'
          }
          value={formData.lessonDescription}
          onChange={(e) => onInputChange('lessonDescription', e.target.value)}
          rows={4}
          fullWidth
          className={TXT}
          containerClassName={TEXTAREA_BOX}
        />
      </section>

      {/* 추가 강좌 내용들 */}
      {formData.additionalContents?.map((value: string, index: number) => {
        const ph =
          initial?.additionalContents?.[index] ??
          `${index + 2}차시에 진행되는 강좌 내용을 적어주세요`;
        return (
          <section key={index}>
            <div className='mb-[2.0rem] flex items-center justify-between'>
              <h2 className='font-medium-16 text-black'>
                강좌 내용 {index + 2}차시
              </h2>
              <Button
                onClick={() => onRemoveAdditionalContent(index)}
                variant='line'
                sizeType='xs'
                className='text-red font-medium-16 !w-auto !border-none !px-4'
                type='button'
              >
                삭제
              </Button>
            </div>
            <Textarea
              placeholder={ph}
              value={value}
              onChange={(e) => onAdditionalContentChange(index, e.target.value)}
              rows={4}
              className={TXT}
              fullWidth
            />
          </section>
        );
      })}

      {/* + 버튼 */}
      <div>
        <Button
          onClick={onAddContent}
          variant='line'
          sizeType='xs'
          className='bg-gray9a0 font-medium-16 rounded-6 h-[4rem] border-none text-white'
          type='button'
        >
          +
        </Button>
      </div>

      {/* 예상 정원 */}
      <section className='flex items-center space-x-[1rem]'>
        <IcUsers height={24} width={24} />
        <span className='text-gray353 font-medium-16'>예상 정원</span>
        <div className='rounded-16 border-gray7eb ml-auto flex h-[5.6rem] w-[18.5rem] items-center justify-end border bg-white px-[1.7rem]'>
          <Input
            type='number'
            placeholder={initial?.expectedParticipants ?? '20'}
            value={formData.expectedParticipants}
            onChange={(e) => onInputChange('expectedParticipants', e.target.value)}
            className='font-medium-16 placeholder:text-gray353 text-right'
            containerClassName='!border-none !bg-transparent !p-0 !rounded-none !h-auto'
          />
          <span className='font-medium-16 ml-[0.5rem] text-black'>명</span>
        </div>
      </section>
    </>
  );
};
