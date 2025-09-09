import { Header, Layout, MemberCard } from '@/components';
import { getAdminMemberList } from '@apis';
import { get } from 'http';
import { use } from 'react';

const Page = () => {
  const { data, response } = use(getAdminMemberList());

  const memberlist = data?.result ?? [];

  return (
    <Layout header={<Header title='회원 목록' />}>
      <div className='flex w-full flex-col gap-[1.4rem] py-[1rem]'>
        {!response?.ok ? (
          <p className='text-gray4a9 py-[2rem] text-center'>
            회원 목록을 불러오지 못했어요
            {data?.message ? `: ${data.message}` : ''}
          </p>
        ) : memberlist.length === 0 ? (
          <p className='text-gray4a9 py-[2rem] text-center'>
            등록된 회원이 없습니다.
          </p>
        ) : (
          memberlist.map((m, i) => (
            <MemberCard
              key={`member-${m.email ?? i}`}
              name={m.name || ''}
              branch={m.branch || ''}
              phone={m.phone || ''}
              email={m.email || ''}
              birth={m.birth || ''}
              deletedAt={m.deletedAt || ''}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Page;
