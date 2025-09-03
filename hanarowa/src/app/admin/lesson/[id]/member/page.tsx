'use client';

import { Header, Layout, MemberCard } from '@/components';
import { getLessonMember } from '@apis';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const lessonGisuId = Number(id);
  const result = getLessonMember(lessonGisuId);

  return (
    <Layout header={<Header title='수강 회원 목록' />}>
      <div className='flex w-full flex-col gap-[1.4rem] py-[1rem]'>
        {result?.data?.result?.map((m, i = 0) => (
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
