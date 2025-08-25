import Link from 'next/link';
import { ClassCard } from '../atoms';

const Lectures = [
  {
    id: 1,
    imageUrl: '/imgs/IMG_7675.png',
    title: '남심 저격',
    creator: '시니영',
    date: '3월 15일',
    participants: 12,
    capacity: 15,
    price: 12000,
  },
  {
    id: 2,
    imageUrl: '/imgs/IMG_7675.png',
    title: '노후 브랜딩',
    creator: '박영희',
    date: '3월 15일',
    participants: 12,
    capacity: 15,
    price: 12000,
  },
  {
    id: 3,
    imageUrl: '/imgs/IMG_7675.png',
    title: '건강한 요리교실',
    creator: '김철수',
    date: '3월 20일',
    participants: 8,
    capacity: 12,
    price: 15000,
  },
  {
    id: 4,
    imageUrl: '/imgs/IMG_7675.png',
    title: '스마트폰 활용법',
    creator: '이민수',
    date: '3월 18일',
    participants: 10,
    capacity: 20,
    price: 8000,
  },
];

const LectureSection = () => {
  return (
    <section className='mt-[3rem]'>
      <div className='mb-[1.8rem] flex flex-row items-center justify-between'>
        <h1 className='font-bold-22 text-black'>인기 강좌</h1>
        <Link href='/lectures' className='font-medium-16 text-main'>
          바로가기
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-[2.5rem]'>
        {Lectures.map(
          ({
            id,
            imageUrl,
            title,
            creator,
            date,
            participants,
            capacity,
            price,
          }) => (
            <ClassCard
              key={id}
              imageUrl={imageUrl}
              title={title}
              creator={creator}
              date={date}
              participants={participants}
              capacity={capacity}
              price={price}
            />
          )
        )}
      </div>
    </section>
  );
};

export default LectureSection;
