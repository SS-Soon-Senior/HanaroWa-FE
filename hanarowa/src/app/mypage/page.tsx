'use client';

import { IcMyMember, IcMyPassword, IcMyLogout, IcMyUnsub } from '@/assets/svg';
import {
  Layout,
  Header,
  BottomNavigation,
  InputUnderline,
} from '@/components/atoms';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Page = () => {
  const [name, setName] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    // 사용자 이름 가져오는 로직 짜야함!!
    const fetchedName = '김시영 님';
    setName(fetchedName ?? '');
  }, []);

  return (
    <Layout
      header={<Header showBackButton={false} title='마이페이지' />}
      footer={<BottomNavigation selectedItem='mypage' />}
    >
      <InputUnderline
        disabled
        fullWidth
        value={name}
        readOnly
        className='text-gray353 px-[1rem]'
      />

      <div className='flex flex-col gap-[3rem] pt-[4rem]'>
        <div
          className='flex flex-row items-center gap-[1.1rem]'
          onClick={() => router.push('/mypage/updateinfo')}
        >
          <IcMyMember />
          <h1 className='text-gray353 font-medium-18'>회원 정보 수정</h1>
        </div>

        <div
          className='flex flex-row items-center gap-[1.1rem]'
          onClick={() => router.push('/mypage/updatepassword')}
        >
          <IcMyPassword />
          <h1 className='font-medium-18 text-gray353'>비밀번호 변경</h1>
        </div>

        {/* 로그아웃 및 회원탈퇴 기능 구현 필요 */}
        <div className='flex flex-row items-center gap-[1.1rem]'>
          <IcMyLogout />
          <h1 className='font-medium-18 text-gray353'>로그아웃</h1>
        </div>
        <div className='flex flex-row items-center gap-[1.1rem]'>
          <IcMyUnsub />
          <h1 className='font-medium-18 text-gray353'>회원 탈퇴</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
