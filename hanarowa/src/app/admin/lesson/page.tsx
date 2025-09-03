'use client';

import { getLessons } from '@/apis/lesson';
import AdminLessonCard from '@/components/lesson/AdminLessonCard';
import { components } from '@/types/api';
import { Header, Layout } from '@components';
import { useEffect, useState } from 'react';

export type AdminLesson = components['schemas']['AdminLessonListResponseDTO'];
type ApiListEnvelope<T> = {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: T[];
};

const Page = () => {
  const [lessons, setLessons] = useState<AdminLesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const { data } = await getLessons();
      const lessonData: AdminLesson[] =
        (data as ApiListEnvelope<AdminLesson>)?.result ?? [];
      setLessons(lessonData);
    };

    fetchLessons();
  }, []);

  return (
    <Layout header={<Header title='강좌 목록' showSearchButton />}>
      <div className='grid w-full grid-cols-2 gap-[2.5rem]'>
        {lessons.map((l, index) => (
          <AdminLessonCard key={l.id || `lesson-${index}`} {...l} />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
