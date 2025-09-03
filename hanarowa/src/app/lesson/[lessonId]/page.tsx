'use client';

import {
  InstructorInfo,
  LessonCurriculum,
  LessonInfo,
  LessonReview,
  LessonTimeTable,
  Button,
  Devider,
  Header,
  Layout,
} from '@/components';
import {
  calculateDurationInWeeks,
  formatLessonTime,
  formatStartDate,
} from '@/utils/formater';
import { useGetLessonDetail } from '@apis';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const Page = () => {
  const { lessonId } = useParams();
  const { data } = useGetLessonDetail(Number(lessonId) ?? 0);
  console.log(data);
  const lessonData = data?.result;

  const startDate = formatStartDate(
    lessonData?.lessonGisus?.[0].duration ?? ''
  ); // "2025년 1월 1일"
  const lessonTime = formatLessonTime(
    lessonData?.lessonGisus?.[0].duration ?? ''
  ); // "월, 화, 수, 목, 금 17:00-18:00"
  const duration = calculateDurationInWeeks(
    lessonData?.lessonGisus?.[0].duration ?? ''
  ); // "8주"

  return (
    <Layout header={<Header title='강좌 상세' showBackButton />}>
      <div className='relative -mx-[2rem] h-[28rem] w-[calc(100%+4rem)]'>
        <Image
          src={lessonData?.lessonImg ?? '/images/lesson/sample-lesson.png'}
          alt='lesson-detail-image'
          fill
          className='object-cover'
        />
      </div>
      <LessonInfo
        category={lessonData?.category ?? 'DIGITAL'}
        title={lessonData?.lessonName ?? ''}
        description={lessonData?.description ?? ''}
        currentApplicants={lessonData?.lessonGisus?.[0].currentEnrollment ?? 0}
        maxApplicants={lessonData?.lessonGisus?.[0].capacity ?? 0}
        price={lessonData?.lessonGisus?.[0].lessonFee ?? 0}
      />
      <Devider />
      <InstructorInfo
        name={lessonData?.instructor ?? ''}
        content={lessonData?.instruction ?? ''}
        rating={lessonData?.averageRating ?? 0}
      />
      <Devider />
      <div className='flex w-full flex-col gap-[2rem] py-[2.5rem]'>
        <p className='font-bold-22 text-black'>강의실</p>
        <p className='font-medium-18 text-gray353'>303호</p>
      </div>
      <Devider />
      <LessonTimeTable
        startDate={startDate}
        classDays={lessonTime}
        duration={duration}
      />
      <Devider />
      <LessonCurriculum
        curriculum={lessonData?.lessonGisus?.[0].curriculums ?? []}
      />
      <Devider />
      <LessonReview reviews={lessonData?.reviews ?? []} />
      <Button sizeType='lg'>강좌 신청하기</Button>
    </Layout>
  );
};
export default Page;
