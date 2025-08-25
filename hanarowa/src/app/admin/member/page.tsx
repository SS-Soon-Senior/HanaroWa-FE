import { Header, Layout, MemberCard } from '@/components/atoms';

const Page = () => {
  return (
    <Layout header={<Header title='회원 목록' />}>
      <div className='flex w-full py-[1rem]'>
        <MemberCard
          name='정소은'
          branch='춘천 컬처뱅크'
          phone='010-1234-5678'
          email='ssilver@gmail.com'
          birth='2001.04.02'
        />
      </div>
    </Layout>
  );
};

export default Page;
