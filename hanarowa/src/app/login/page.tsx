'use client';

import { Button, ErrorMessage, Input } from '@/components/atoms';
import Header from '@/components/atoms/Header';
import Layout from '@/components/atoms/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useActionState } from 'react';
import { login } from './actions';
import type { ErrorState } from './actions';

export default function LoginPage() {
  const [loginState, loginAction] = useActionState<ErrorState, FormData>(
    login,
    {
      success: true,
      message: '',
      id: '',
      password: '',
    }
  );

  return (
    <Layout header={<Header />}>
      <div className='relative flex w-full flex-col items-center'>
        <div className='flex w-full flex-col items-center pt-[1.7rem]'>
          <Image
            src='/imgs/logo.png'
            alt='logo'
            width={109}
            height={109}
            priority
          />
        </div>
        <form action={loginAction} className='flex w-full flex-col'>
          <div className='items-center pt-[3.5rem]'>
            <div className='flex flex-col justify-start gap-[1.7rem]'>
              <p className='font-medium-20 text-black'>아이디</p>
              <Input
                placeholder='아이디를 입력해주세요'
                name='id'
                defaultValue={loginState.id}
              />
            </div>
            <div className='flex flex-col justify-start gap-[1.7rem] pt-[2.9rem]'>
              <p className='font-medium-20 text-black'>비밀번호</p>
              <Input
                placeholder='비밀번호를 입력해주세요'
                name='password'
                defaultValue={loginState.password}
              />
            </div>
          </div>
          {!loginState.success && (
            <ErrorMessage className='pt-[0.6rem]'>
              {loginState.message}
            </ErrorMessage>
          )}
          <div className='flex flex-col gap-[2.5rem] pt-[17.5rem]'>
            <div className='font-medium-18 text-gray4a9 flex items-center justify-center underline'>
              <Link href='/soicial'>회원가입 하러가기</Link>
            </div>
            <Button variant='disabled' sizeType='lg' type='submit'>
              확인
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
