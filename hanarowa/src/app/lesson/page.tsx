import { Header, Layout } from '@/components/atoms';
import { LessonCard } from '@/components/lesson';

const Lessons = [
  {
    id: 1,
    imageUrl: '/imgs/IMG_7675.png',
    title: '남심 저격',
    creator: '시니영',
    date: '3월 15일',
    participants: 12,
    capacity: 15,
    price: 120000,
  },
  {
    id: 2,
    imageUrl: '/imgs/IMG_7675.png',
    title: '노후 브랜딩',
    creator: '박영희',
    date: '3월 15일',
    participants: 12,
    capacity: 15,
    price: 120000,
  },
  {
    id: 3,
    imageUrl: '/imgs/IMG_7675.png',
    title: '건강한 요리교실',
    creator: '김철수',
    date: '3월 20일',
    participants: 8,
    capacity: 12,
    price: 120000,
  },
  {
    id: 4,
    imageUrl: '/imgs/IMG_7675.png',
    title: '스마트폰 활용법',
    creator: '이민수',
    date: '3월 18일',
    participants: 10,
    capacity: 20,
    price: 120000,
  },
];

const Page = () => {
  return (
    <Layout header={<Header title='강좌 목록' />}>
      <div className='grid w-full grid-cols-2 gap-[2.5rem] pt-[2.5rem]'>
        {Lessons.map(({ id, ...cardProps }) => (
          <LessonCard key={id} {...cardProps} />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
