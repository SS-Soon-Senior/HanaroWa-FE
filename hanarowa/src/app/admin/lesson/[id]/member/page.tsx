import { Header, Layout, MemberCard } from '@/components';
import { getLessonMember } from '@apis';
import { use } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = ({ params }: Props) => {
  const { id } = use(params);
  const { data } = use(getLessonMember(+id));

  return (
    <Layout header={<Header title='수강 회원 목록' />}>
      <div className='flex w-full flex-col gap-[1.4rem] py-[1rem]'>
        {data?.result?.map((m, i) => (
          <MemberCard
            key={`member-${i}`}
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
