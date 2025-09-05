'use client';

import useGetFilterLessonList from '@/apis/lesson/useGetFilterLessonList';
import { useGetMemberBranch } from '@apis';
import Link from 'next/link';
import { LessonCard } from '../lesson';

const LessonSection = () => {
  const myBranchResponse = useGetMemberBranch();
  const myBranch = myBranchResponse.data?.result;
  const response = useGetFilterLessonList(myBranch?.branchId || 1);
  if (!response?.isSuccess) {
    return null;
  }
  const lessons = response.result?.lessons ? response.result.lessons : [];
  const topTwo = lessons.slice(0, 2);

  return (
    <section className='mt-[3rem] w-full'>
      <div className='mb-[1.8rem] flex flex-row items-center justify-between'>
        <h1 className='font-bold-22 text-black'>최신 강좌</h1>
        <Link href='/lesson' className='font-medium-16 text-main'>
          바로가기
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-[2.5rem]'>
        {topTwo.map((lesson) => (
          <LessonCard key={lesson.lessonId} {...lesson} />
        ))}
      </div>
    </section>
  );
};

export default LessonSection;
