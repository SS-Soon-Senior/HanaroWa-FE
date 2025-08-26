'use client';

import { IcCloseeye, IcOpeneye } from '@/assets/svg';
import { Header, Layout, Input, Button, ErrorMessage } from '@/components';
import { useState, ChangeEvent } from 'react';

const hasLetterAndNumber = (s: string) => /[A-Za-z]/.test(s) && /\d/.test(s);

const Page = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  const [error, setError] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCheckNewPassword, setShowCheckNewPassword] = useState(false);

  const isFull = [password, newPassword, checkNewPassword].every(Boolean);
  const handleSubmit = async () => {
    // 현재 비번 서버에서 확인하는 함수 생성 필요
    // const ok = await checkMemberPassword(password);
    // if (!ok) {
    //   setError('비밀번호가 일치하지 않습니다.');
    //   return;
    // }

    // 새 비밀번호/확인 불일치
    if (newPassword !== checkNewPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비번 유효성 검증
    if (!hasLetterAndNumber(newPassword)) {
      setError('영문자, 숫자를 모두 포함해야 합니다.');
      return;
    }

    // 모두 통과
    setError('');

    // 서버 api 호출하는 코드 필요
  };

  const onChangeClear =
    (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      if (error) setError('');
      setter(e.target.value);
    };

  return (
    <Layout header={<Header title='비밀번호 수정' />}>
      <div className='flex w-full flex-1 flex-col justify-between gap-[2rem] pt-[9rem]'>
        <div className='flex flex-col gap-[2.4rem] px-[1rem]'>
          <div className='flex flex-col gap-[1.6rem]'>
            <p className='font-medium-20'>현재 비밀번호</p>
            <Input
              value={password}
              onChange={onChangeClear(setPassword)}
              type={showPassword ? 'text' : 'password'}
              maxLength={20}
              autoComplete='new-password'
              fullWidth
              rightContent={
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IcOpeneye /> : <IcCloseeye />}
                </button>
              }
            />
          </div>
          <div className='flex flex-col gap-[1.6rem]'>
            <p className='font-medium-20'>새 비밀번호</p>
            <Input
              value={newPassword}
              onChange={onChangeClear(setNewPassword)}
              type={showNewPassword ? 'text' : 'password'}
              maxLength={20}
              autoComplete='new-password'
              fullWidth
              rightContent={
                <button onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <IcOpeneye /> : <IcCloseeye />}
                </button>
              }
            />
          </div>

          <div className='flex flex-col gap-[1.6rem]'>
            <p className='font-medium-20'>새 비밀번호 확인</p>
            <Input
              value={checkNewPassword}
              onChange={onChangeClear(setCheckNewPassword)}
              type={showCheckNewPassword ? 'text' : 'password'}
              maxLength={20}
              autoComplete='new-password'
              fullWidth
              rightContent={
                <button
                  onClick={() => setShowCheckNewPassword(!showCheckNewPassword)}
                >
                  {showCheckNewPassword ? <IcOpeneye /> : <IcCloseeye />}
                </button>
              }
            />
          </div>
        </div>
        {error && (
          <div className='mb-[1.2rem] flex justify-center'>
            <ErrorMessage align='text-center'>{error}</ErrorMessage>
          </div>
        )}
        <Button
          sizeType='lg'
          variant={isFull ? 'green' : 'disabled'}
          disabled={!isFull}
          onClick={handleSubmit}
        >
          수정하기
        </Button>
      </div>
    </Layout>
  );
};

export default Page;
