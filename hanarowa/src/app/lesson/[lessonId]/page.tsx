import getLessonDetail from '@/apis/lesson/getLessonDetailInfo';
import postLessonApply from '@/apis/lesson/postLessonApply';
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
} from '@/utils/formatter';
import Image from 'next/image';
import { redirect } from 'next/navigation';
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

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const DEFAULT_IMAGE_URL =
    'https://hanarowa-upload.s3.ap-northeast-2.amazonaws.com/uploads/hanabank.png';

  const validImageUrl =
    lessonData?.lessonImg && isValidUrl(lessonData?.lessonImg)
      ? lessonData?.lessonImg
      : DEFAULT_IMAGE_URL;

  async function applyForLessonAction() {
    'use server';

    const lessonGisuId = lessonData?.lessonGisus?.[0].id;

    const { data, error } = await postLessonApply(Number(lessonGisuId));
    if (data?.isSuccess && !error) {
      console.log('강좌 신청 성공:', data.message);
      // 신청 성공 시, 원하는 경로로 리디렉션 (예: 마이페이지)
      redirect('/complete');
    }

    if (error) {
      console.error('강좌 신청 실패:', error);
      // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
    }
  }

  return (
    <Layout header={<Header title='강좌 상세' showBackButton />}>
      <form className='flex w-full flex-col' action={applyForLessonAction}>
        <div className='relative -mx-[2rem] h-[28rem] w-[calc(100%+4rem)]'>
          <Image
            src={validImageUrl}
            alt='lesson-detail-image'
            fill
            className='object-cover'
          />
        </div>
        <LessonInfo
          category={lessonData?.category ?? 'DIGITAL'}
          title={lessonData?.lessonName ?? ''}
          description={lessonData?.description ?? ''}
          currentApplicants={
            lessonData?.lessonGisus?.[0].currentEnrollment ?? 0
          }
          maxApplicants={lessonData?.lessonGisus?.[0].capacity ?? 0}
          price={lessonData?.lessonGisus?.[0].lessonFee ?? 0}
          lessonGisuId={lessonData?.lessonGisus?.[0].id ?? 0}
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
        <Button sizeType='lg' type='submit'>
          강좌 신청하기
        </Button>
      </form>
    </Layout>
  );
};
export default Page;
