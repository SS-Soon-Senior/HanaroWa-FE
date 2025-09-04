'use client';

import {
  Header,
  Layout,
  Input,
  Button,
  ErrorMessage,
  Modal,
  DatePicker,
} from '@/components';
import {
  formatDateFromISO,
  formatDateToISO,
  formatPhone,
} from '@/utils/formatter';
import { useGetMemberInfo, useModifyInfo } from '@apis';
import { useModal } from '@hooks';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';

const Page = () => {
  // 서버에서 가져온 값
  const { data } = useGetMemberInfo();
  const { isOpen, openModal, closeModal } = useModal();
  const serverBirth = data?.result?.birth;
  const serverPhone = data?.result?.phone;

  const router = useRouter();

  // 사용자가 실제로 입력하는 값
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  //입력값 검증
  const [showError, setShowError] = useState(false);

  const isDirty = birth !== '' || phone !== '';

  const { mutate } = useModifyInfo();

  const handleSubmit = () => {
    const finalBirth =
      birth && birth.trim() !== ''
        ? birth.replace(/\D/g, '')
        : (serverBirth ?? '');

    const finalPhone =
      phone && phone.trim() !== '' ? phone : (serverPhone ?? '');

    const valid = finalBirth.length === 8 && finalPhone.length === 13;

    if (!valid) {
      setShowError(true);
      return;
    }
    setShowError(false);

    mutate(
      {
        body: {
          birth: finalBirth, // "YYYYMMDD" 8자리
          phoneNumber: finalPhone,
        },
      },
      {
        onSuccess: () => {
          openModal();
        },

        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <Layout
      header={<Header title='회원 정보 수정' />}
      footer={
        <div className='fixed inset-x-0 bottom-[4rem] z-50 px-[2rem]'>
          {showError && (
            <div className='mb-[1.2rem] flex justify-center'>
              <ErrorMessage align='text-center'>
                각 항목을 올바르게 입력해주세요.
              </ErrorMessage>
            </div>
          )}
          <Button
            sizeType='lg'
            variant={isDirty ? 'green' : 'disabled'}
            onClick={handleSubmit}
          >
            수정하기
          </Button>
        </div>
      }
    >
      <div className='flex w-full flex-col gap-[3rem] pt-[9rem]'>
        <div className='flex flex-col gap-[1.6rem]'>
          <p className='font-medium-20'>생년월일</p>
          <DatePicker
            value={
              birth
                ? formatDateToISO(birth)
                : serverBirth
                  ? formatDateToISO(serverBirth)
                  : ''
            }
            onChange={(value) => setBirth(formatDateFromISO(value))}
            placeholder={serverBirth}
            maxDate={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className='flex flex-col gap-[1.6rem]'>
          <p className='font-medium-20'>전화번호</p>
          <Input
            placeholder={
              serverPhone ? formatPhone(serverPhone) : '010-0000-0000'
            }
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhone(formatPhone(e.target.value))
            }
            inputMode='numeric'
            maxLength={13}
            autoComplete='tel'
            fullWidth
          />
        </div>

        {isOpen && (
          <Modal
            title='회원 정보 수정 완료'
            greenButtonText='확인'
            onClickGreenButton={() => {
              closeModal();
              router.push('/mypage');
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default Page;
