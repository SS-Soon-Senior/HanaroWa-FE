'use client';

import { Header, Layout, MemberCard } from '@/components';
import { useAdminGetMemberlist } from '@apis';

const Page = () => {
  const { data } = useAdminGetMemberlist();

  const memberlist = data?.result;

  return (
    <Layout header={<Header title='회원 목록' />}>
      <div className='flex w-full flex-col gap-[1.4rem] py-[1rem]'>
        {memberlist?.map((m, i = 0) => (
          <MemberCard
            key={i++}
            name={m.name || ''}
            branch={m.branch || ''}
            phone={m.phone || ''}
            email={m.email || ''}
            birth={m.birth || ''}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
