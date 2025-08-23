import { IcBlackcalendar, IcLocation } from '@/assets/svg';
import React from 'react';
import Button from './Button';

type RoomReservationCardProps = {
  roomName: string;
  reserveHanDate: string;
  reservationDate: string;
  location: string;
  isUsed?: boolean;
};

const RoomReservationCard: React.FC<RoomReservationCardProps> = ({
  roomName,
  reserveHanDate,
  reservationDate,
  location,
  isUsed = false,
}) => {
  return (
    <div className='rounded-8 flex w-full flex-col bg-white'>
      <div className='flex flex-col gap-[2rem] p-[2.4rem]'>
        <p className='font-medium-18 text-gray3af'>{reserveHanDate}</p>
        <div className='flex flex-col gap-[1.2rem]'>
          <p className='font-bold-24 text-black'>{roomName}</p>
          <div className='flex flex-col gap-[0.8rem]'>
            <div className='flex flex-row items-center gap-[1.2rem]'>
              <IcBlackcalendar className='h-[2rem] w-[2rem]' />

              <p className='font-medium-20 text-gray353'>{reservationDate}</p>
            </div>
            <div className='flex flex-row items-center gap-[1.2rem]'>
              <IcLocation className='h-[2rem] w-[2rem]' />

              <p className='font-medium-20 text-gray353'>{location}</p>
            </div>
          </div>
        </div>
        {!isUsed ? (
          <div className='flex flex-row gap-[1.3rem]'>
            <Button
              variant='lightgray'
              sizeType='reserve'
              className='font-gray280'
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
