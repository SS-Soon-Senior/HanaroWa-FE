'use client';

import {
  Layout,
  Header,
  Button,
  FacilityImageCarousel,
  FacilityInfo,
  DateSelector,
  TimeSelector,
  ReservationSummary,
} from '@/components';
import { useState } from 'react';

type Schedule = Record<string, string[]>;

const DUMMY_SCHEDULE: Schedule = {
  '2025-08-19': ['09:00'],
  '2025-08-20': ['10:00'],
  '2025-08-21': ['11:00'],
};

const Page = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>('2025-08-19');
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

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
    <Layout header={<Header showBackButton={true} title='예약하기' />}>
      <FacilityImageCarousel images={ImgSrc} />

      <FacilityInfo roomname={roomname} roomtext={roomtext} />

      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      <TimeSelector
        times={times}
        selectedTimes={selectedTimes}
        bookedTimes={bookedTimesForSelectedDate}
        onTimeSelect={handleTimeSelect}
      />

      <ReservationSummary
        selectedDate={selectedDate}
        duration={duration}
        startTime={startTime}
        endTime={endTime}
        toKoreanDate={toKoreanDate}
      />

      <Button variant={duration === 0 ? 'disabled' : 'green'} sizeType='lg'>
        예약하기
      </Button>
    </Layout>
  );
};

export default Page;
