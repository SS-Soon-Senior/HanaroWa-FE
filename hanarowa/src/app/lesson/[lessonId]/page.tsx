import { Button, Devider, Header, Layout } from '@/components/atoms';
import {
  InstructorInfo,
  LessonCurriculum,
  LessonInfo,
  LessonReview,
  LessonTimeTable,
} from '@/components/lesson';
import { LessonCurriculumItem } from '@/components/lesson/detail/LessonCurriculum';
import Image from 'next/image';

const Page = () => {
  const lessonData = {
    instructorInfo: {
      name: '홍길동',
      content: `사진작가 · 15년 경력
대한사진협회 정회원
개인전 10회 개최
하나50+ 우수강사상 수상`,
    },
    lessonInfo: {
      category: 'digital' as const,
      title: '리액트 기초부터 심화까지, 실무 프로젝트로 배우는 리액트',
      description:
        '이 강의는 리액트의 기초부터 심화까지 다루며, 실무 프로젝트를 통해 실제 개발 환경에서의 활용법을 배웁니다.',
      currentApplicants: 8,
      maxApplicants: 15,
      price: 300000,
    },
    timeTable: {
      startDate: '2024년 06월 10일',
      classDays: '매주 월, 수 오후 7시 ~ 9시',
      duration: '6주',
    },
    curriculum: [
      {
        title: '1주차',
        content: '리액트 기초',
      },
      {
        title: '2주차',
        content: '컴포넌트 이해하기',
      },
      {
        title: '3주차',
        content: '상태 관리',
      },
      {
        title: '3주차',
        content: '상태 관리',
      },
      {
        title: '3주차',
        content: '상태 관리',
      },
    ] as LessonCurriculumItem[],
    reviews: [
      {
        id: 1,
        reviewer: '김00',
        rating: 4,
        comment:
          '남심 저격 강의를 듣고 결혼까지 성공했어요~~~~^-^ 감사합니다 김시영 강사님 !!',
      },
      {
        id: 2,
        reviewer: '이00',
        rating: 5,
        comment: '정말 유익한 강의였습니다. 추천합니다!',
      },
      {
        id: 3,
        reviewer: '박00',
        rating: 3,
        comment: '강의 내용이 조금 부족한 것 같아요.',
      },
    ],
  };
  return (
    <Layout header={<Header title='강좌 상세' showBackButton />}>
      <div className='relative -mx-[2rem] h-[28rem] w-[calc(100%+4rem)]'>
        <Image
          src='/imgs/cinemaroom.png'
          alt='lesson-detail-image'
          fill
          className='object-cover'
        />
      </div>
      <LessonInfo
        category={lessonData.lessonInfo.category}
        title={lessonData.lessonInfo.title}
        description={lessonData.lessonInfo.description}
        currentApplicants={lessonData.lessonInfo.currentApplicants}
        maxApplicants={lessonData.lessonInfo.maxApplicants}
        price={lessonData.lessonInfo.price}
      />
      <Devider />
      <InstructorInfo
        name={lessonData.instructorInfo.name}
        content={lessonData.instructorInfo.content}
      />
      <Devider />
      <LessonTimeTable
        startDate={lessonData.timeTable.startDate}
        classDays={lessonData.timeTable.classDays}
        duration={lessonData.timeTable.duration}
      />
      <Devider />
      <LessonCurriculum curriculum={lessonData.curriculum} />
      <Devider />
      <LessonReview reviews={lessonData.reviews} />
      <Button sizeType='lg'>강좌 신청하기</Button>
    </Layout>
  );
};
export default Page;
