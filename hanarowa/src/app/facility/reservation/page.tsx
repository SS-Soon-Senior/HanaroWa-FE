'use client';

import {
  IcClock,
  IcGreencalendar,
  IcInfo,
  IcWhitearrow,
  IcWhitearrowreverse,
} from '@/assets/svg';
import { Button, Header, Layout } from '@/components/atoms';
import Image from 'next/image';
import { useState } from 'react';

type Schedule = Record<string, string[]>;

const DUMMY_SCHEDULE: Schedule = {
  '2025-08-19': ['09:00'],
  '2025-08-20': ['10:00'],
  '2025-08-21': ['11:00'],
};

const Page = () => {
  Date.now();
  const [selectedDate, setSelectedDate] = useState<string | null>('2025-08-19'); //첫번째 날짜로 초기화 합시다
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);

  const bookedTimesForSelectedDate = selectedDate
    ? DUMMY_SCHEDULE[selectedDate] || []
    : [];

  const ImgSrc = [
    '/imgs/IMG_7675.png',
    '/imgs/cinemaroom.png',
    '/imgs/stardolilogo.png',
  ];
  const roomname = '화이트보드룸';
  const roomtext = '편안하게 영화를 볼 수 있는 공간';

  const handleImageIndex = (index: number) => {
    setImageIndex(index + 1);
  };

  const handleImageIndexMinus = (index: number) => {
    setImageIndex(index - 1);
  };

  const handleDateSelect = (date: string): void => {
    setSelectedDate(date);
    setSelectedTimes([]);
  };

  const handleTimeSelect = (clickedTime: string): void => {
    const isAlreadySelected = selectedTimes.includes(clickedTime);
    let newSelection = [...selectedTimes];

    if (isAlreadySelected) {
      newSelection = newSelection.filter((t) => t !== clickedTime);
    } else {
      if (newSelection.length < 2) {
        newSelection.push(clickedTime);
      } else {
        newSelection = [clickedTime];
      }
    }

    newSelection.sort();
    if (newSelection.length === 2) {
      const firstHour = parseInt(newSelection[0].split(':')[0]);
      const secondHour = parseInt(newSelection[1].split(':')[0]);
      if (secondHour - firstHour !== 1) {
        newSelection = [clickedTime];
      }
    }
    setSelectedTimes(newSelection);
  };

  const dates = ['2025-08-19', '2025-08-20', '2025-08-21'];
  const times = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];
  const sortedSelectedTimes = [...selectedTimes].sort();
  const startTime = sortedSelectedTimes[0];
  const duration = sortedSelectedTimes.length;
  const endTime = startTime
    ? `${parseInt(startTime.split(':')[0]) + duration}:00`
    : '';

  const toKoreanDate = (iso: string): string => {
    const [y, m, d] = iso.split('-');
    return `${y}년 ${parseInt(m, 10)}월 ${parseInt(d, 10)}일`;
  };

  return (
    <Layout
      header={<Header showBackButton={true} title='예약하기' />}
      footer={
        <div className='px-[2rem] pb-[2rem]'>
          <Button variant={duration === 0 ? 'disabled' : 'green'} sizeType='lg'>
            예약하기
          </Button>
        </div>
      }
    >
      <div className='relative h-[22.9rem] w-full pt-[2.6rem]'>
        <Image
          src={ImgSrc[imageIndex]}
          alt='Reservation Image'
          fill
          objectFit='cover'
        />
      </div>
      {imageIndex < ImgSrc.length - 1 && (
        <div
          onClick={() => handleImageIndex(imageIndex)}
          className='bg-opacity-30 absolute top-[15.5rem] right-[2.8rem] flex h-[3.6rem] w-[3.6rem] cursor-pointer items-center justify-center rounded-full bg-black'
        >
          <IcWhitearrow />
        </div>
      )}
      <div className='flex flex-col gap-[1.2rem] pt-[2.6rem] pl-[1.7rem]'>
        <p className='font-bold-24'>{roomname}</p>{' '}
        {imageIndex > 0 && (
          <div
            onClick={() => handleImageIndexMinus(imageIndex)}
            className='bg-opacity-30 absolute top-[15.5rem] left-[2.8rem] flex h-[3.6rem] w-[3.6rem] cursor-pointer items-center justify-center rounded-full bg-black'
          >
            <IcWhitearrowreverse />
          </div>
        )}
        <p className='font-medium-18 text-grayaaa'>{roomtext}</p>
      </div>
      <div className='flex flex-col gap-[1.4rem] pt-[2.3rem] pl-[0.5rem]'>
        <p className='font-medium-20'>예약 날짜</p>
        <div className='flex flex-row gap-[1rem]'>
          {dates.map((date: string) => {
            return (
              <Button
                key={date}
                variant={selectedDate === date ? 'green' : 'line'}
                sizeType='xs'
                onClick={() => handleDateSelect(date)}
              >
                {date.slice(5).replace('-', '/')}
              </Button>
            );
          })}
        </div>
      </div>
      <div className='flex flex-col gap-[1.4rem] pt-[2.4rem] pl-[0.5rem]'>
        <p className='font-medium-20'>예약 시간</p>
        <div className='grid grid-cols-3 gap-x-[1rem] gap-y-[1.7rem]'>
          {times.map((time: string) => {
            const isBooked = bookedTimesForSelectedDate.includes(time);
            const isSelected = selectedTimes.includes(time);

            return (
              <Button
                key={time}
                variant={isSelected ? 'green' : isBooked ? 'disabled' : 'line'}
                sizeType='xs'
                onClick={() => !isBooked && handleTimeSelect(time)}
                disabled={isBooked}
              >
                {time}
              </Button>
            );
          })}
        </div>
      </div>
      <div className='border-main mt-[4.5rem] flex w-full flex-col border-t-2 border-dashed pt-[3.2rem]'>
        <div className='min-h-[16rem]'>
          {selectedDate && duration > 0 ? (
            <div className='rounded-16 border-main flex w-full flex-col items-start border bg-[#E0F7FA] pl-[2rem] text-[#00695C]'>
              <p className='font-bold-20 pt-[2rem]'>선택된 예약 정보</p>
              <div className='flex flex-col gap-[0.8rem] pt-[1.2rem]'>
                <div className='flex flex-row items-center justify-center gap-[1.2rem]'>
                  <IcGreencalendar />{' '}
                  <p className='font-medium-18'>
                    {toKoreanDate(selectedDate)} (무슨요일)
                  </p>
                </div>
                <div className='flex flex-row items-center gap-[1.2rem] pb-[2rem]'>
                  <IcClock />{' '}
                  <p className='font-medium-18'>
                    {startTime} ~ {endTime} ({duration}시간)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='rounded-16 flex w-full flex-row items-center justify-center border border-[#FED7AA] bg-[#FEF7ED] py-[2rem]'>
              <IcInfo />
              <p className='font-bold-20 pl-[0.7rem] text-[#EA580C]'>
                선택된 예약 정보가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
