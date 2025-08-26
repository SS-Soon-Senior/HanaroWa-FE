'use client';

import { Header, Layout, Input, Button, ErrorMessage } from '@/components';
import { useState, useEffect } from 'react';

const digits = (s: string) => s.replace(/\D/g, '');

const formatPhone = (v: string) => {
  const d = digits(v).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
};

const Page = () => {
  // 서버에서 가져온 값
  const [initialBirth, setInitialBirth] = useState('');
  const [initialPhone, setInitialPhone] = useState('');

  // 사용자가 실제로 입력하는 값(초기엔 비워둠)
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  //입력값 검증
  const [showError, setShowError] = useState(false);

  //fetch 후 응답으로 대체
  useEffect(() => {
    setInitialBirth('960101');
    setInitialPhone('01012345678');
  }, []);

  const isDirty = birth !== '' || phone !== '';

  const isValid =
    (birth === '' || birth.length === 6) &&
    (phone === '' || digits(phone).length === 11);

  const handleSubmit = () => {
    if (!isValid) {
      setShowError(true);
      return;
    }
    setShowError(false);

    //여기에 isValid 일 시의 액션 코드 추가 필요!!(서버API 호출)
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
            placeholder={initialBirth || '000000'}
            value={birth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBirth(digits(e.target.value).slice(0, 6))
            }
            inputMode='numeric'
            maxLength={6}
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
      </div>
    </Layout>
  );
};

export default Page;
