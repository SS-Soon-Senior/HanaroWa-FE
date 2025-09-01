'use client';

import postSignin from '@/apis/auth/postSignin';
import { IcBookByeoldol } from '@/assets/svg';
import { Header, Input, ErrorMessage, Button, Layout } from '@/components';
import { setAccessToken } from '@/utils/common/auth';
import { useBranch } from '@hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { updateMyBranch } = useBranch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await postSignin({ email, password });

      if (data?.code == 'MEMBER400') {
        setError('아이디 또는 비밀번호를 확인해주세요.');
        return;
      }

      const accessToken = data?.result?.tokens?.accessToken;
      const branch = data?.result?.branch;

      if (accessToken) {
        setAccessToken(accessToken);
      }

      updateMyBranch({ ...branch });
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Layout header={<Header />}>
      <div className='flex w-full flex-1 flex-col items-center'>
        <div className='flex flex-col items-center pt-[1.7rem]'>
          <IcBookByeoldol />
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex min-h-full w-full flex-1 flex-col justify-between'
        >
          <div className='items-center pt-[3.5rem]'>
            <div className='flex flex-col justify-start gap-[1.7rem]'>
              <p className='font-medium-20 text-black'>이메일</p>
              <Input
                placeholder='이메일을 입력해주세요'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col justify-start gap-[1.7rem] pt-[2.9rem]'>
              <p className='font-medium-20 text-black'>비밀번호</p>
              <Input
                placeholder='비밀번호를 입력해주세요'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className='pt-[0.6rem]'>
              <ErrorMessage>{error}</ErrorMessage>
            </div>
          )}
          <div className='mt-auto flex flex-col gap-[2.5rem]'>
            <div className='font-medium-18 text-gray4a9 flex items-center justify-center underline'>
              <Link href='/auth/signup'>회원가입 하러가기</Link>
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
