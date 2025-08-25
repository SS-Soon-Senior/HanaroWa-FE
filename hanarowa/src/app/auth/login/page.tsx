'use client';

import { IcBookByeoldol } from '@/assets/svg';
import {
  Header,
  Input,
  ErrorMessage,
  Button,
  Layout,
} from '@/components/atoms';
import Link from 'next/link';
import { useActionState } from 'react';
import { login } from './actions';
import type { ErrorState } from './actions';

const Page = () => {
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
      <div className='flex w-full flex-1 flex-col items-center'>
        <div className='flex flex-col items-center pt-[1.7rem]'>
          <IcBookByeoldol />
        </div>
        <form
          action={loginAction}
          className='flex min-h-full w-full flex-1 flex-col justify-between'
        >
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
            <div className='pt-[0.6rem]'>
              <ErrorMessage>{loginState.message}</ErrorMessage>
            </div>
          )}
          <div className='mt-auto flex flex-col gap-[2.5rem]'>
            <div className='font-medium-18 text-gray4a9 flex items-center justify-center underline'>
              <Link href='/signup'>회원가입 하러가기</Link>
            </div>
            <Button variant='green' sizeType='lg' type='submit'>
              확인
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Page;
