'use client';

import { IcMyMember, IcMyPassword, IcMyLogout, IcMyUnsub } from '@/assets/svg';
import { Header, BottomNavigation, Layout, Modal } from '@/components';
import { useModal } from '@/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const divStyle = 'flex flex-row items-center gap-[1.1rem]';
const textStyle = 'font-medium-22 text-gray353';

const Page = () => {
  const [name, setName] = useState<string>('');
  const { isOpen, openModal, closeModal } = useModal();

  const router = useRouter();

  //탈퇴 api 구현 필요
  const handleUnsubscribe = async () => {
    closeModal();
    router.replace('/'); // 혹은 로그인 페이지 등으로 이동
  };

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
      <h1
        className={`${textStyle} border-gray4a9 flex w-full border-b-[0.2rem] px-[1rem] py-[1rem]`}
      >
        {name}
      </h1>
      <div className='flex w-full flex-col items-start gap-[3rem] pt-[4rem]'>
        <Link href='/mypage/info' className={divStyle}>
          <IcMyMember />
          <h1 className={textStyle}>회원 정보 수정</h1>
        </Link>

        <Link href='/mypage/password' className={divStyle}>
          <IcMyPassword />
          <h1 className={textStyle}>비밀번호 변경</h1>
        </Link>

        {/* 로그아웃 기능 구현 필요*/}
        <Link href='/auth/login/social' className={divStyle}>
          <IcMyLogout />
          <h1 className={textStyle}>로그아웃</h1>
        </Link>

        <div
          className='flex flex-row items-center gap-[1.1rem]'
          onClick={openModal}
        >
          <IcMyUnsub />
          <h1 className={textStyle}>회원 탈퇴</h1>
        </div>

        {isOpen && (
          <Modal
            title='정말 탈퇴하시겠어요?'
            description='탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.'
            greenButtonText='탈퇴하기'
            grayButtonText='취소'
            onClickGreenButton={handleUnsubscribe}
            onClickGrayButton={closeModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default Page;
