import { IcBlackcalendar, IcLocation, IcUsers } from '@/assets/svg';
import React from 'react';
import { Button } from '../atoms';

type RoomReservationCardProps = {
  facilityName?: string | null;
  startedAt?: string | null;
  placeName?: string | null; //위치
  reservedAt?: string | null; // 예약한시간
  isUsed?: boolean | null;
  userName?: string | null;
  onClick?: () => void;
};

const RoomReservationCard = ({
  facilityName,
  reservedAt,
  startedAt,
  placeName,
  isUsed,
  userName,
  onClick,
}: RoomReservationCardProps) => {
  return (
    <div className='rounded-16 border-gray7eb flex w-full flex-col border bg-white'>
      <div className='flex flex-col gap-[2rem] p-[2.4rem]'>
        <p className='font-medium-18 text-gray3af'>{reservedAt}</p>
        <div className='flex flex-col gap-[1.2rem]'>
          <p className='font-bold-24 text-black'>{facilityName}</p>
          <div className='flex flex-col gap-[0.8rem]'>
            <div className='flex flex-row items-center gap-[1.2rem]'>
              <IcBlackcalendar className='h-[2rem] w-[2rem]' />

              <p className='font-medium-20 text-gray353'>{startedAt}</p>
            </div>
            <div className='flex flex-row items-center gap-[1.2rem]'>
              <IcLocation className='h-[2rem] w-[2rem]' />

              <p className='font-medium-20 text-gray353'>{placeName}</p>
            </div>

            {userName && (
              <div className='flex flex-row items-center gap-[1.2rem]'>
                <IcUsers className='h-[2rem] w-[2rem]' />

                <p className='font-medium-20 text-gray353'>{userName}</p>
              </div>
            )}
          </div>
        </div>
        {!isUsed ? (
          <div className='flex flex-row gap-[1.3rem]'>
            <Button
              variant='lightgray'
              sizeType='reserve'
              className='font-gray280 font-medium-18'
              onClick={onClick}
            >
              취소하기
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RoomReservationCard;
