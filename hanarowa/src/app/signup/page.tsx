'use client';

import { IcSignupFace } from '@/assets/svg';
import { Button, ErrorMessage, Input } from '@/components/atoms';
import Header from '@/components/atoms/Header';
import Layout from '@/components/atoms/Layout';
import { useState } from 'react';
import { useActionState } from 'react';
import { signup, SignupErrorState } from './action';

const Page = () => {
  const [signupState, signupAction] = useActionState<
    SignupErrorState,
    FormData
  >(signup, {
    success: true,
    message: '',
    name: '',
    id: '',
    password: '',
    confirmPassword: '',
  });

  const [form, setForm] = useState({
    name: '',
    id: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const isAllFilled = Object.values(form).every((v) => v.trim() !== '');

  const fieldBaseClass = 'flex flex-col justify-start gap-[1.7rem]';

  return (
    <Layout header={<Header />}>
      <div className='relative flex w-full flex-col items-center'>
        <div className='flex w-full flex-col items-center pt-[1.7rem]'>
          <IcSignupFace width={100} height={100} />
        </div>

        <form action={signupAction} className='flex w-full flex-col'>
          <div className='items-center pt-[3.5rem]'>
            <div className={fieldBaseClass}>
              <p className='font-medium-20 text-black'>이름</p>
              <Input
                placeholder='이름을 입력해주세요.'
                name='name'
                value={form.name}
                onChange={handleChange('name')}
              />
            </div>

            <div className={`${fieldBaseClass} pt-[2.9rem]`}>
              <p className='font-medium-20 text-black'>아이디</p>
              <Input
                placeholder='아이디를 입력해주세요.'
                name='id'
                value={form.id}
                onChange={handleChange('id')}
              />
            </div>

            <div className={`${fieldBaseClass} pt-[2.9rem]`}>
              <p className='font-medium-20 text-black'>비밀번호</p>
              <Input
                placeholder='비밀번호를 입력해주세요.'
                name='password'
                type='password'
                value={form.password}
                onChange={handleChange('password')}
              />
            </div>

            <div className={`${fieldBaseClass} pt-[2.9rem]`}>
              <Input
                placeholder='비밀번호 확인'
                name='confirmPassword'
                type='password'
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
            </div>
          </div>

          {!signupState.success && (
            <ErrorMessage className='pt-[0.6rem]'>
              {signupState.message}
            </ErrorMessage>
          )}

          <div className='flex flex-col gap-[2.5rem] pt-[5rem]'>
            <Button
              variant={isAllFilled ? 'green' : 'disabled'}
              sizeType='lg'
              type='submit'
              disabled={!isAllFilled}
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
