'use client';

import { Lessons } from '@/app/lesson/page';
import { Header, Layout, LessonCard } from '@components';
import Link from 'next/link';

const Page = () => {
  return (
    <Layout header={<Header title='강좌 목록' showSearchButton />}>
      <div className='grid w-full grid-cols-2 gap-[2.5rem]'>
        {Lessons.map(({ id, ...cardProps }) => (
          <Link key={id} href={`/admin/lesson/${id}/member`}>
            <LessonCard {...cardProps} />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Page;
