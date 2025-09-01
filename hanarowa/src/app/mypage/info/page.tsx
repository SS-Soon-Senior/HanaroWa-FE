'use client';

import usePostMemberInfo from '@/apis/member/usePostMemberInfo';
import {
  Header,
  Layout,
  Input,
  Button,
  ErrorMessage,
  Modal,
} from '@/components';
import { useGetMemberInfo } from '@apis';
import { useModal } from '@hooks';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';

const digits = (s: string) => s.replace(/\D/g, '');

const formatPhone = (v: string) => {
  const d = digits(v).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
};

const Page = () => {
  // 서버에서 가져온 값
  const { data } = useGetMemberInfo();
  const [initialBirth, setInitialBirth] = useState(data?.result?.birth);
  const [initialPhone, setInitialPhone] = useState(data?.result?.phone);
  const { isOpen, openModal, closeModal } = useModal();

  const router = useRouter();

  // 사용자가 실제로 입력하는 값
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  //입력값 검증
  const [showError, setShowError] = useState(false);

  const isDirty = birth !== '' || phone !== '';

  const isValid =
    (birth === '' || (birth ?? '').length === 8) &&
    (phone === '' || digits(phone ?? '').length === 13);

  const { mutate } = usePostMemberInfo();

  useEffect(() => {
    setInitialBirth(data?.result?.birth);
    setInitialPhone(data?.result?.phone);
  }, [data]);

  const handleSubmit = () => {
    // 1) 최종 값 합성: 사용자가 입력했으면 입력값, 아니면 초기값
    const finalBirth =
      birth && birth.trim() !== '' ? birth : (initialBirth ?? '');

    const finalPhone =
      phone && phone.trim() !== '' ? phone : (initialPhone ?? '');

    // 2) 검증 (8자리 생일, 11자리 폰)
    const valid = finalBirth.length === 8 && finalPhone.length === 13;

    if (!valid) {
      setShowError(true);
      return;
    }
    setShowError(false);

    // 3) 전송
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
          <Input
            placeholder={initialBirth || '00000000'}
            value={birth}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBirth(digits(e.target.value).slice(0, 8))
            }
            inputMode='numeric'
            maxLength={8}
            autoComplete='bday'
            fullWidth
          />
        </div>
        <div className='flex flex-col gap-[1.6rem]'>
          <p className='font-medium-20'>전화번호</p>
          <Input
            placeholder={
              initialPhone ? formatPhone(initialPhone) : '010-0000-0000'
            }
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
