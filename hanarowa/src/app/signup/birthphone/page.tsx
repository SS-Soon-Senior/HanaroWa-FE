'use client';

import { IcSignupFace } from '@/assets/svg';
import { Button, Input } from '@/components/atoms';
import Header from '@/components/atoms/Header';
import Layout from '@/components/atoms/Layout';
import { useState } from 'react';

export default function SignupBirthPhonePage() {
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  const isAllFilled = birth.trim() !== '' && phone.trim() !== '';

  return (
    <Layout header={<Header />}>
      <div className='relative flex w-full flex-col items-center'>
        <div className='flex w-full flex-col items-center pt-[1.7rem]'>
          <IcSignupFace width={100} height={100} />
        </div>

        <form className='flex w-full flex-col'>
          <div className='items-center pt-[3.5rem]'>
            {/* 생년월일 */}
            <div className='flex flex-col justify-start gap-[1.7rem]'>
              <p className='font-medium-20 text-black'>
                생년월일을 입력하세요.
              </p>
              <Input
                placeholder='6자리 숫자로 입력해주세요.'
                name='birth'
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className='flex flex-col gap-[2.5rem] pt-[17.5rem]'>
            <Button
              variant={isAllFilled ? 'green' : 'disabled'}
              sizeType='lg'
              type='button'
              disabled={!isAllFilled}
            >
              확인
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
