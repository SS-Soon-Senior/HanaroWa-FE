'use client';

import { IcBlackcalendar, IcLocation, IcUser } from '@/assets/svg';
import { useDeleteLesson } from '@apis';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, StatusTag } from '../atoms';

type LessonReservationCardProps = {
  lessonGisuId: number;
  lessonName: string;
  reserveHanDate: string;
  reservationDate: string;
  location: string;
  instructor: string;
  isReviewed?: boolean;
  isInProgress?: boolean;
  isOpened?: boolean;
  statusViewed?: boolean;
  refetch: () => void;
};

const LessonReservationCard = ({
  lessonGisuId,
  lessonName,
  reserveHanDate,
  reservationDate,
  location,
  instructor,
  isReviewed = true,
  isInProgress,
  isOpened = true,
  statusViewed = false,
  refetch,
}: LessonReservationCardProps) => {
  const { mutate } = useDeleteLesson();
  const [canceling, setCanceling] = useState(false);

  const cancelLesson = () => {
    setCanceling(true);
    mutate(
      {
        params: {
          path: { lessonGisuId },
        },
      },
      {
        onSuccess: () => {
          refetch();
        },
        onError: () => {
          setCanceling(false);
          refetch();
        },
      }
    );
  };
  return (
    <div className='rounded-8 flex w-full flex-col bg-white'>
      <div className='relative flex flex-col gap-[2rem] p-[2.4rem]'>
        {!isInProgress && statusViewed && (
          <div className='absolute top-7 right-4'>
            <StatusTag status='complete' />
          </div>
        )}
        <p className='font-medium-18 text-gray3af'>{reserveHanDate}</p>
        <div className='flex flex-col gap-[1.2rem]'>
          <p className='font-bold-24 text-black'>{lessonName}</p>
          <div className='flex flex-col gap-[0.8rem]'>
            <div className='flex flex-row items-center gap-[1.2rem]'>
              <IcUser className='h-[2rem] w-[2rem]' />
              <p className='font-medium-20 text-gray353'>{instructor} 강사님</p>
            </div>
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

        {!isOpened &&
          (isInProgress ? (
            <Button
              variant='lightgray'
              sizeType='reserve'
              onClick={cancelLesson}
              disabled={canceling}
            >
              취소하기
            </Button>
          ) : isReviewed ? (
            <Button variant='disabled' sizeType='reserve'>
              리뷰작성완료
            </Button>
          ) : (
            <Button variant='green' sizeType='reserve'>
              <Link href={`/lesson/${lessonGisuId}/review`}>리뷰작성하기</Link>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default LessonReservationCard;
