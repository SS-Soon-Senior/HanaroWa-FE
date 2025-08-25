'use client';

import { ClassCard, ClassReservationCard } from '@/components/lesson';
import Image from 'next/image';

const SplashPage = () => {
  return (
    <div className='relative flex flex-col items-center pt-[25.7rem]'>
      <Image
        src='/imgs/logo.png'
        alt='logo'
        width={187}
        height={187}
        priority
      />
      <p className='font-medium-26 relative mt-[-2rem] text-center text-black'>
        하나로와
      </p>
      <ClassReservationCard
        courseName='강의명'
        reserveHanDate='2023-01-01'
        reservationDate='2023-01-02'
        location='강의실'
        instructor='강사명'
      />
      <div className='flex flex-row'>
        <ClassCard
          imageUrl='/imgs/logo.png'
          title='클래스 제목'
          creator='크리에이터'
          date='2023-01-01'
          participants={5}
          capacity={10}
          price={20000}
        />
        <ClassCard
          imageUrl='/imgs/logo.png'
          title='클래스 제목'
          creator='크리에이터'
          date='2023-01-01'
          participants={5}
          capacity={10}
          price={20000}
        />
      </div>
    </div>
  );
};

export default SplashPage;
