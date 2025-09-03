import { IcBlackcalendar, IcLocation } from '@/assets/svg';
import { components } from '@/types/api';
import React from 'react';
import { Button } from '../atoms';

type RoomReservationCardProps = {
  facilityName?: string | null;
  startedAt?: string | null;
  placeName?: string | null; //위치
  reservedAt?: string | null; // 예약한시간
  isUsed?: boolean | null;
};

const RoomReservationCard = ({
  facilityName,
  reservedAt,
  startedAt,
  placeName,
  isUsed,
}: RoomReservationCardProps) => {
  return (
    <div className='rounded-16 border-gray7eb flex w-full flex-col border bg-white'>
      <div className='flex flex-col gap-[2rem] p-[2.4rem]'>
        <p className='font-medium-18 text-gray3af'>{reservedAt}</p>
        <div className='flex flex-col gap-[1.2rem]'>
          <p className='font-bold-24 text-black'>{placeName}</p>
          <div className='flex flex-col gap-[0.8rem]'>
            <div className='flex flex-row items-center gap-[1.2rem]'>
              <IcBlackcalendar className='h-[2rem] w-[2rem]' />

              <p className='font-medium-20 text-gray353'>{startedAt}</p>
            </div>
            <div className='flex flex-row items-center gap-[1.2rem]'>
              <IcLocation className='h-[2rem] w-[2rem]' />

              <p className='font-medium-20 text-gray353'>{placeName}</p>
            </div>
          </div>
        </div>
        {!isUsed ? (
          <div className='flex flex-row gap-[1.3rem]'>
            <Button
              variant='lightgray'
              sizeType='reserve'
              className='font-gray280 font-medium-18'
            >
              취소하기
            </Button>
            <Button variant='green' sizeType='reserve'>
              상세보기
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RoomReservationCard;
