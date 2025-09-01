'use client';

import useGetFilterLessonList from '@/apis/lesson/useGetFilterLessonList';
import { useBranch } from '@hooks';
import Link from 'next/link';
import { LessonCard } from '../lesson';

const LessonSection = () => {
  const { myBranch } = useBranch();
  const response = useGetFilterLessonList(myBranch.branchId!);
  if (!response?.isSuccess) {
    return null;
  }
  const lessons = response.result?.lessons ? response.result.lessons : [];

  return (
    <section className='mt-[3rem] w-full'>
      <div className='mb-[1.8rem] flex flex-row items-center justify-between'>
        <h1 className='font-bold-22 text-black'>인기 강좌</h1>
        <Link href='/lesson' className='font-medium-16 text-main'>
          바로가기
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-[2.5rem]'>
        {lessons.map((lesson) => (
          <LessonCard key={lesson.lessonId} {...lesson} />
        ))}
      </div>
    </section>
  );
};

export default LessonSection;
