import getLessonDetail from '@/apis/lesson/getLessonDetailInfo';
import {
  InstructorInfo,
  LessonCurriculum,
  LessonInfo,
  LessonReview,
  LessonTimeTable,
  Divider,
  Header,
  Layout,
  ApplyButton,
} from '@/components';
import {
  calculateDurationInWeeks,
  formatLessonTime,
  formatStartDate,
} from '@/utils/formatter';
import Image from 'next/image';
import { use } from 'react';

type Props = {
  params: Promise<{ lessonId: string }>;
};

const Page = ({ params }: Props) => {
  const { lessonId } = use(params);
  const { data } = use(getLessonDetail(Number(lessonId)));
  const lessonData = data?.result;
  const startDate = formatStartDate(
    lessonData?.lessonGisus?.[0].duration ?? ''
  ); // "2025년 1월 1일"
  const lessonTime = formatLessonTime(
    lessonData?.lessonGisus?.[0].duration ?? ''
  ); // "월-금 17:00-18:00"
  const duration = calculateDurationInWeeks(
    lessonData?.lessonGisus?.[0].duration ?? ''
  ); // "8주"

  return (
    <Layout header={<Header title='강좌 상세' showBackButton />}>
      <div className='relative -mx-[2rem] h-[28rem] w-[calc(100%+4rem)]'>
        <Image
          src={
            lessonData?.lessonImg ??
            'https://hanarowa-upload.s3.ap-northeast-2.amazonaws.com/uploads/hanabank.png'
          }
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
        lessonGisuId={lessonData?.lessonGisus?.[0].id ?? 0}
      />
      <Divider />
      <InstructorInfo
        name={lessonData?.instructor ?? ''}
        content={lessonData?.instruction ?? ''}
        rating={lessonData?.averageRating ?? 0}
      />
      <Divider />
      <div className='flex w-full flex-col gap-[2rem] py-[2.5rem]'>
        <p className='font-bold-22 text-black'>강의실</p>
        <p className='font-medium-18 text-gray353'>
          {lessonData?.lessonGisus?.[0].lessonRoom ?? ''}
        </p>
      </div>
      <Divider />
      <LessonTimeTable
        startDate={startDate}
        classDays={lessonTime}
        duration={duration}
      />
      <Divider />
      <LessonCurriculum
        curriculum={lessonData?.lessonGisus?.[0].curriculums ?? []}
      />
      <Divider />
      <LessonReview reviews={lessonData?.reviews ?? []} />
      <ApplyButton lessonGisuId={lessonData?.lessonGisus?.[0].id ?? 0} />
    </Layout>
  );
};
export default Page;
