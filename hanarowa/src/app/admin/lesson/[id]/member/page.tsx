'use client';

import { Header, Layout, MemberCard, Modal } from '@/components';
import { useModal } from '@/hooks';

const Page = () => {
  const { isOpen, openModal, closeModal } = useModal();

  //회원 삭제 api 구현 필요
  const handleDelete = () => {
    closeModal();
  };

  return (
    <Layout header={<Header title='수강 회원 목록' />}>
      <div className='flex w-full flex-col gap-[1.4rem] py-[1rem]'>
        {/* 더미데이터 */}
        <MemberCard
          name='정소은'
          branch='춘천 컬처뱅크'
          phone='010-1234-5678'
          email='ssilver@gmail.com'
          birth='2001.04.02'
          onClick={openModal}
        />

        <MemberCard
          name='김시영'
          branch='춘천 컬처뱅크'
          phone='010-1234-5678'
          email='sisees01@gmail.com'
          birth='2002.01.11'
          onClick={openModal}
        />

        <MemberCard
          name='송채영'
          branch='춘천 컬처뱅크'
          phone='010-1234-5678'
          email='thdcodud@gmail.com'
          birth='2000.01.08'
          onClick={openModal}
        />
      </div>

      {isOpen && (
        <Modal
          title='회원을 삭제하시겠어요?'
          description='삭제 시 모든 데이터가 사라집니다.'
          greenButtonText='삭제하기'
          grayButtonText='취소'
          onClickGreenButton={handleDelete}
          onClickGrayButton={closeModal}
        />
      )}
    </Layout>
  );
};

export default Page;
