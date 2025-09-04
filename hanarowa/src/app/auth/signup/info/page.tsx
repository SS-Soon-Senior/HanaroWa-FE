'use client';

import usePostMemberInfo from '@/apis/member/usePostMemberInfo';
import { IcSignupFace } from '@/assets/svg';
import {
  Layout,
  Header,
  Input,
  Button,
  ErrorMessage,
  DatePicker,
} from '@/components';
import {
  formatDateFromISO,
  formatDateToISO,
  formatPhone,
} from '@/utils/formatter';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  const { mutate } = usePostMemberInfo();

  const [showError, setShowError] = useState(false);

  const isAllFilled = birth.trim() !== '' && phone.trim() !== '';
  const valid = birth.replace(/\D/g, '').length === 8 && phone.length === 13;

  const handleSubmit = () => {
    if (!valid) {
      setShowError(true);
      return;
    }
    setShowError(false);

    mutate(
      {
        body: {
          birth: birth.replace(/\D/g, ''), // YYYYMMDD 형식으로 변환
          phoneNumber: phone, // 하이픈 포함
        },
      },
      {
        onSuccess: () => {
          router.push('/branch');
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <Layout header={<Header />}>
      <div className='relative flex w-full flex-1 flex-col items-center'>
        <div className='flex w-full flex-col items-center pt-[1.7rem]'>
          <IcSignupFace width={100} height={100} />
        </div>

        <form className='flex w-full flex-1 flex-col'>
          <div className='items-center pt-[3.5rem]'>
            {/* 생년월일 */}
            <div className='flex flex-col justify-start gap-[1.7rem]'>
              <p className='font-medium-20 text-black'>
                생년월일을 입력하세요.
              </p>
              <DatePicker
                value={birth ? formatDateToISO(birth) : ''}
                onChange={(value) => setBirth(formatDateFromISO(value))}
                placeholder='생년월일을 선택하세요'
                maxDate={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* 전화번호 */}
            <div className='flex flex-col justify-start gap-[1.7rem] pt-[2.9rem]'>
              <p className='font-medium-20 text-black'>
                전화번호를 입력해주세요.
              </p>
              <Input
                placeholder='010-0000-0000'
                name='phone'
                value={phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPhone(formatPhone(e.target.value))
                }
                inputMode='numeric'
                maxLength={13}
                autoComplete='tel'
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className='mx-auto mt-auto flex w-full flex-col gap-[2.5rem]'>
            {showError && (
              <div className='mb-[1.2rem] flex justify-center'>
                <ErrorMessage align='text-center'>
                  각 항목을 올바르게 입력해주세요.
                </ErrorMessage>
              </div>
            )}
            <Button
              variant={isAllFilled ? 'green' : 'disabled'}
              sizeType='lg'
              type='button'
              disabled={!isAllFilled}
              onClick={handleSubmit}
            >
              확인
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Page;
