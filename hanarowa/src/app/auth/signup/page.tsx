'use client';

import { postSignup } from '@/apis';
import { IcCloseeye, IcOpeneye, IcSignupFace } from '@/assets/svg';
import { Header, Input, ErrorMessage, Button, Layout } from '@/components';
import { setAccessToken } from '@/utils/common/auth';
import { a } from 'framer-motion/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const [showError, setShowError] = useState('');
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    id: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange =
    (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
      if (showError) setShowError('');
    };

  const isAllFilled = Object.values(form).every((v) => v.trim() !== '');

  const fieldBaseClass = 'flex flex-col justify-start gap-[1.5rem]';

  const handleSubmit = async () => {
    //이메일 유효성 확인
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(form.id)) {
      setShowError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    // 비밀번호 영문+숫자 포함 체크
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    if (!regex.test(form.password)) {
      setShowError(
        '비밀번호는 6~20자 사이이며 영문, 숫자를 각각 최소 1개 포함해야 합니다.'
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setShowError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const { data, response } = await postSignup({
        name: form.name,
        email: form.id,
        password: form.password,
      });

      if (!response.ok) {
        const msg =
          response.status === 409
            ? '이미 사용 중인 이메일입니다.'
            : '회원가입에 실패했습니다. 다시 시도해주세요.';
        setShowError(msg);
        return;
      }

      const accessToken = data?.result?.tokens?.accessToken;
      const url = data?.result?.url;
      if (accessToken) {
        setAccessToken(accessToken);
      }
      router.push(`${url}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout header={<Header />}>
      <div className='relative flex w-full flex-1 flex-col items-center'>
        <div className='flex w-full flex-col items-center pt-[1rem]'>
          <IcSignupFace width={100} height={100} />
        </div>

        <form
          action={handleSubmit}
          className='flex w-full flex-1 flex-col justify-between'
        >
          <div className='items-center pt-[1rem]'>
            <div className={fieldBaseClass}>
              <p className='font-medium-20 text-black'>이름</p>
              <Input
                placeholder='이름을 입력해주세요.'
                name='name'
                value={form.name}
                onChange={handleChange('name')}
              />
            </div>

            <div className={`${fieldBaseClass} pt-[2rem]`}>
              <p className='font-medium-20 text-black'>이메일</p>
              <Input
                placeholder='이메일을 입력해주세요.'
                name='id'
                value={form.id}
                onChange={handleChange('id')}
              />
            </div>

            <div className={`${fieldBaseClass} pt-[2rem]`}>
              <p className='font-medium-20 text-black'>비밀번호</p>
              <Input
                placeholder='비밀번호를 입력해주세요.'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange('password')}
                rightContent={
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <IcOpeneye /> : <IcCloseeye />}
                  </button>
                }
              />
            </div>

            <div className={`${fieldBaseClass} pt-[1rem] pb-[0.6rem]`}>
              <Input
                placeholder='비밀번호 확인'
                name='confirmPassword'
                type={showCheckPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                rightContent={
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCheckPassword(!showCheckPassword);
                    }}
                  >
                    {showCheckPassword ? <IcOpeneye /> : <IcCloseeye />}
                  </button>
                }
              />
            </div>

            <div className='flex justify-center'>
              {showError && <ErrorMessage>{showError}</ErrorMessage>}
            </div>
          </div>

          <Button
            variant={isAllFilled ? 'green' : 'disabled'}
            sizeType='lg'
            type='submit'
            disabled={!isAllFilled}
          >
            확인
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Page;
