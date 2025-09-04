import AdminLessonCard from '@/components/lesson/AdminLessonCard';
import { components } from '@/types/api';
import { getLessons } from '@apis';
import { Header, Layout } from '@components';
import { use } from 'react';

export type AdminLesson = components['schemas']['AdminLessonListResponseDTO'];

const Page = () => {
  const { data } = use(getLessons());
  const lessons: AdminLesson[] = data?.result ?? [];
  return (
    <Layout header={<Header title='강좌 목록' />}>
      <div className='grid w-full grid-cols-2 gap-[2.5rem]'>
        {lessons.map((l) => (
          <AdminLessonCard key={l.id} {...l} />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
