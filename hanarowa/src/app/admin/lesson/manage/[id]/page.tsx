'use client';

import { useLessonEditContext, LessonEditProvider } from '@/contexts';
import {
  Layout,
  Header,
  Button,
} from '@components';
import { LessonEditFormFields } from '@/components/lesson';
import { useParams, useRouter } from 'next/navigation';
import { FormEventHandler, useRef, ChangeEvent } from 'react';


function DetailForm() {
  const {
    initial,
    loading,
    formData,
    isDirty,
    handleInputChange,
    handleAddContent,
    handleAdditionalContentChange,
    removeAdditionalContent,
    updateLessonData,
  } = useLessonEditContext();

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const t = e.target as HTMLInputElement;
    if (t.files && t.files[0]) handleInputChange('lessonImage', t.files[0]);
  };

  const removeImage = () => {
    handleInputChange('lessonImage', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };


  if (loading && !initial) {
    return (
      <Layout header={<Header title='강좌 수정하기' showBackButton />}>
        <div className='text-gray353 p-4'>불러오는 중...</div>
      </Layout>
    );
  }

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const success = await updateLessonData();
    if (success) {
      router.push('/admin/lesson/manage');
    }
  };

  return (
    <Layout header={<Header title='강좌 신청 상세' showBackButton />}>
      <form onSubmit={onSubmit} className='w-full space-y-[2rem]'>
        <LessonEditFormFields
          initial={initial}
          formData={formData}
          fileInputRef={fileInputRef}
          onInputChange={handleInputChange}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          onAddContent={handleAddContent}
          onAdditionalContentChange={handleAdditionalContentChange}
          onRemoveAdditionalContent={removeAdditionalContent}
        />

        {/* 수정하기 */}
        <div className='pb-[2rem]'>
          <Button
            type='submit'
            variant='green'
            sizeType='lg'
            disabled={!isDirty || loading || !initial}
            className='h-[6.3rem] text-center font-bold text-white disabled:cursor-not-allowed disabled:opacity-40'
            style={{
              fontFamily: 'Inter',
              fontSize: '16px',
              lineHeight: '21.6px',
            }}
          >
            수정하기
          </Button>
        </div>
      </form>
    </Layout>
  );
}

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return (
    <LessonEditProvider id={id}>
      <DetailForm />
    </LessonEditProvider>
  );
}
