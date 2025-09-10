import { Header, Layout, MemberCard } from '@/components';
import { getAdminMemberList } from '@apis';
import { use } from 'react';

const Page = () => {
  const a = use(getAdminMemberList());

  const memberlist = a.data?.result ?? [];

  return (
    <Layout header={<Header title='회원 목록' />}>
      <div className='flex w-full flex-col gap-[1.4rem] py-[1rem]'>
        {!a.response?.ok ? (
          <span className='text-gray4a9 py-[2rem] text-center text-2xl'>
            회원 목록을 불러오지 못했어요
            {JSON.stringify(a)}
            {a.data?.message ? `: ${a.data.message}` : ''}
          </span>
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
              deletedAt={''}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Page;
