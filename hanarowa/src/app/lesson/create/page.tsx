'use client';

import { useGetMemberBranch, useGetMemberInfo } from '@/apis';
import { Layout, Header, Button, Modal } from '@/components';
import { LessonFormFields } from '@/components/lesson';
import { useLessonForm } from '@/hooks';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const response = useGetMemberBranch();
  const myBranch = response.data?.result;
  const memberInfoResponse = useGetMemberInfo();
  const memberInfo = memberInfoResponse.data?.result;

  const getTodayFormatted = () => {
    const today = new Date();
    return today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const {
    formData,
    fileInputRef,
    imageError,
    disabledTimeSlots,
    isPending,
    isCheckingAvailability,
    handleInputChange,
    handleAddContent,
    handleAdditionalContentChange,
    removeAdditionalContent,
    handleRemoveImage,
    handleImageUpload,
    checkTimeAvailability,
    handleSubmit,
  } = useLessonForm({
    isAdmin: false,
    branchId: String(myBranch?.branchId || ''),
    instructorName: memberInfo?.name || '',
    onSuccess: () => setShowSuccessModal(true),
  });


  useEffect(() => {
    if (
      formData.startDate &&
      formData.endDate &&
      formData.days &&
      formData.days !== '' &&
      myBranch?.branchId
    ) {
      checkTimeAvailability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.startDate, formData.endDate, formData.days, myBranch?.branchId]);




  return (
    <Layout
      header={
        <Header title='강좌 개설하기' showBackButton={true} backUrl='/' />
      }
    >
      <div className='mb-[4rem] flex w-full flex-col gap-[2rem]'>
        <LessonFormFields
          formData={formData}
          imageError={imageError}
          disabledTimeSlots={disabledTimeSlots}
          isCheckingAvailability={isCheckingAvailability}
          isAdmin={false}
          fileInputRef={fileInputRef}
          onInputChange={handleInputChange}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
          onAddContent={handleAddContent}
          onAdditionalContentChange={handleAdditionalContentChange}
          onRemoveAdditionalContent={removeAdditionalContent}
          getTodayFormatted={getTodayFormatted}
        />
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
