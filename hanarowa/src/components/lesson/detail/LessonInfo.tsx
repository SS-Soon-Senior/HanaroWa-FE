'use client';

import { useReservationCountWS } from '@/apis/lesson/useReservationCountWs';
import { IcPeople } from '@/assets/svg';
import { CategoryTag } from '@/components/atoms';
import { CategoryKey } from '@/constants/category';

type LessonInfoProps = {
  category: CategoryKey;
  title: string;
  description: string;
  currentApplicants: number;
  maxApplicants: number;
  price: number;
  lessonGisuId: number;
};

const LessonInfo = ({
  category,
  title,
  description,
  currentApplicants,
  maxApplicants,
  price,
  lessonGisuId,
}: LessonInfoProps) => {
  const { data: count, isConnected } = useReservationCountWS(lessonGisuId);

  const displayedCurrentApplicants = count?.reserved ?? currentApplicants;
  const displayedMaxApplicants = count?.capacity ?? maxApplicants;

  return (
    <div className='flex w-full flex-col gap-[2.7rem] py-[2.5rem]'>
      <div className='text-sm text-gray-600'>
        현재 예약{' '}
        {displayedCurrentApplicants
          ? `${displayedCurrentApplicants} / ${displayedMaxApplicants}`
          : '…'}
        {isConnected && <span className='ml-2 text-green-500'>●</span>}
      </div>
      <div className='flex flex-col gap-[1.2rem]'>
        <CategoryTag category={category} />
        <p className='font-bold-26 text-black'>{title}</p>
        <p className='font-medium-20 text-black'>{description}</p>
      </div>
      <div className='flex flex-col gap-[1.6rem]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[0.8rem]'>
            <IcPeople width={24} height={24} />
            <span className='text-gray280 font-medium-18'>현재신청자</span>
          </div>
          <span className='text-main font-heavy-20'>
            {displayedCurrentApplicants}/{displayedMaxApplicants}명
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-gray280 font-medium-18'>월 수강료</span>
          <span className='font-heavy-22'>{price.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
};
export default LessonInfo;
