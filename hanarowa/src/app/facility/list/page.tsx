'use client';

import { Header, Layout } from '@/components/atoms';
import { FacilityCard } from '@/components/facility';

// 더미 <<< 작업할 때 날려주세욥
const facilities = [
  {
    imageUrl: '@/assets/svg/IcSignupFace.svg',
    facilityName: '시네마룸',
    description: '편안하게 영화를 볼 수 있는 공간',
    height: 200,
  },
  {
    imageUrl: '@/assets/svg/IcSignupFace.svg',
    facilityName: '스터디룸',
    description: '조용하게 공부할 수 있는 공간',
    height: 200,
  },
  {
    imageUrl: '@/assets/svg/IcSignupFace.svg',
    facilityName: '피트니스룸',
    description: '운동을 할 수 있는 공간',
    height: 200,
  },
  {
    imageUrl: '@/assets/svg/IcSignupFace.svg',
    facilityName: '피트니스룸',
    description: '운동을 할 수 있는 공간',
    height: 200,
  },
  {
    imageUrl: '@/assets/svg/IcSignupFace.svg',
    facilityName: '피트니스룸',
    description: '운동을 할 수 있는 공간',
    height: 200,
  },
];

const Page = () => {
  return (
    <Layout header={<Header title='시설 예약하기' />}>
      <div className='flex flex-col gap-6 p-4'>
        {facilities.map((facility, index) => (
          <FacilityCard
            key={index}
            imageUrl={facility.imageUrl}
            facilityName={facility.facilityName}
            description={facility.description}
            height={facility.height}
            onClick={() => console.log(`${facility.facilityName} 클릭`)} // 여기 수정해야 합니다.
          />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
